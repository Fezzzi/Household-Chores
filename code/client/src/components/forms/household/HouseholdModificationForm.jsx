import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Save } from '@material-ui/icons'

import { SectionHeadline } from 'clientSrc/styles/blocks/settings'
import { HouseholdActions } from 'clientSrc/actions'
import { useFormState, useUpdateHandler } from 'clientSrc/helpers/form'
import { useMemberListProps, useInvitationListProps } from 'clientSrc/helpers/household'
import { SUBMIT_TIMEOUT } from 'clientSrc/constants'
import { HOUSEHOLD } from 'shared/constants/localeMessages'
import { HOUSEHOLD_ROLE_TYPE } from 'shared/constants'
import { formatDate } from 'shared/helpers/date'
import {
  HOUSEHOLD_GROUP_KEYS, HOUSEHOLD_KEYS, INVITATION_KEYS, MEMBER_KEYS, PROFILE,
} from 'shared/constants/settingsDataKeys'

import HouseholdFormHeader from './HouseholdFormHeader'
import HouseholdInvitationForm from './HouseholdInvitationForm'
import { LocaleText, Table } from '../../common'
import { SimpleFloatingElement } from '../../portals'

const HouseholdModificationForm = ({ household, connections, onSubmit }) => {
  const {
    [HOUSEHOLD_KEYS.ID]: householdId,
    [HOUSEHOLD_KEYS.PHOTO]: photo,
    [HOUSEHOLD_KEYS.NAME]: name,
    [HOUSEHOLD_GROUP_KEYS.MEMBERS]: members,
    [HOUSEHOLD_GROUP_KEYS.INVITATIONS]: invitations,
  } = household

  // This state holds information about sending state of leave/delete buttons in household header
  const [sendingField, setSendingField] = useState(null)
  const [timer, setTimer] = useState(0)

  useEffect(() => () => timer && clearTimeout(timer), [])

  const {
    submitMessage,
    isFormValid,
    isFormSending,
    inputs,
    errors,
    setFormState,
  } = useFormState([household, connections])
  const { invitedConnections, removedInvitations, removedMembers, changedRoles } = inputs
  const updateInput = useMemo(() => useUpdateHandler(setFormState), [setFormState])

  const updateArrayValue = useCallback((key, value, add = true) => {
    const newValue = (
      inputs[key]?.filter(input => typeof input === 'object'
        ? input?.id !== value?.id
        : input !== value)
    ) ?? []
    if (add) {
      newValue.push(value)
    }
    updateInput(key, true, newValue, null, [])
  }, [invitedConnections, removedInvitations, removedMembers, changedRoles, updateInput])

  const userState = useSelector(({ app }) => app.user)
  const currentUser = useMemo(() => {
    const member = members.find(member => member[MEMBER_KEYS.ID] === userState[PROFILE.ID])
    return {
      id: userState[PROFILE.ID],
      photo: member[MEMBER_KEYS.PHOTO] ?? userState[PROFILE.PHOTO],
      name: member[MEMBER_KEYS.NAME] ?? userState[PROFILE.NAME],
      role: member[MEMBER_KEYS.ROLE],
    }
  }, [members, userState])

  const invitableConnections = useMemo(() => connections.filter(({ id }) =>
    !members.find(member => member[MEMBER_KEYS.ID] === id)
    && !invitations.find(invitation => invitation[INVITATION_KEYS.TO_ID] === id)
    && !invitedConnections?.find(user => user === id)
  ), [connections, members, invitations, invitedConnections])

  const memberTableProps = useMemo(() =>
    useMemberListProps(
      members.map(member => ({
        memberId: member[MEMBER_KEYS.ID],
        memberRole: changedRoles?.find(obj => obj.id === member[MEMBER_KEYS.ID])?.role ?? member[MEMBER_KEYS.ROLE],
        memberPhoto: member[MEMBER_KEYS.PHOTO],
        memberDateJoined: member[MEMBER_KEYS.DATE_JOINED],
        memberName: member[MEMBER_KEYS.NAME],
      })),
      currentUser,
      toId => removedMembers?.includes(toId),
      (toId, role) => {
        const isChangedRole = role !== members.find(member => member[MEMBER_KEYS.ID])?.[MEMBER_KEYS.ROLE]
        if (isChangedRole) {
          updateArrayValue('changedRoles', { id: toId, role })
        } else {
          updateArrayValue('changedRoles', { id: toId, role }, false)
        }
      },
      toId => updateArrayValue('removedMembers', toId),
      toId => updateArrayValue('removedMembers', toId, false)
    ),
  [members, removedMembers, changedRoles, currentUser])

  const invitationTableProps = useMemo(() =>
    useInvitationListProps([
      ...(invitedConnections
        ? invitedConnections.map(id => {
          const connectedUser = connections.find(user => user.id === id)
          return {
            fromPhoto: currentUser.photo,
            fromNickname: currentUser.name,
            fromId: currentUser.id,
            toPhoto: connectedUser.photo,
            toNickname: connectedUser.nickname,
            toId: id,
            dateCreated: '(PENDING)',
          }
        })
        : []
      ),
      ...invitations.map(invitation => {
        const invitor = members.find(member => member[MEMBER_KEYS.ID] === invitation[INVITATION_KEYS.FROM_ID])
        const allowCancellation = removedInvitations?.includes(invitation[INVITATION_KEYS.TO_ID])
        const disableDeletion = allowCancellation || [HOUSEHOLD_ROLE_TYPE.MEMBER].includes(currentUser.role)
        return invitor && {
          fromPhoto: invitor[MEMBER_KEYS.PHOTO],
          fromNickname: invitor[MEMBER_KEYS.NAME],
          fromId: invitation[INVITATION_KEYS.FROM_ID],
          toPhoto: invitation[INVITATION_KEYS.TO_PHOTO],
          toNickname: invitation[INVITATION_KEYS.TO_NICKNAME],
          toId: invitation[INVITATION_KEYS.TO_ID],
          dateCreated: formatDate(invitation[INVITATION_KEYS.DATE_CREATED]),
          disableDeletion,
          allowCancellation,
        }
      }).filter(Boolean),
    ],
    toId => {
      const isExistingInvitation = invitations.find(invitation => invitation[INVITATION_KEYS.TO_ID] === toId)
      if (isExistingInvitation) {
        updateArrayValue('removedInvitations', toId)
      } else {
        updateArrayValue('invitedConnections', toId, false)
      }
    },
    toId => updateArrayValue('removedInvitations', toId, false)
    ),
  [invitedConnections, removedInvitations, invitations, members, currentUser])

  const dispatch = useDispatch()
  const handleLeaveHousehold = useCallback(() => {
    setSendingField({ [HOUSEHOLD.LEAVE]: HOUSEHOLD.LEAVING })
    dispatch(HouseholdActions.leaveHousehold({ householdId }))
    setTimer(setTimeout(() => setSendingField && setSendingField(null), SUBMIT_TIMEOUT))
  }, [householdId, dispatch])

  const handleDeleteHousehold = useCallback(() => {
    setSendingField({ [HOUSEHOLD.DELETE]: HOUSEHOLD.DELETING })
    dispatch(HouseholdActions.deleteHousehold({ householdId }))
    setTimer(setTimeout(() => setSendingField && setSendingField(null), SUBMIT_TIMEOUT))
  }, [householdId, dispatch])

  const canDeleteHousehold = useMemo(() => {
    const admins = members
      .filter(member => member[MEMBER_KEYS.ROLE] === HOUSEHOLD_ROLE_TYPE.ADMIN)
      .map(admin => admin[MEMBER_KEYS.ID])
    return admins.length > 1 || admins.indexOf(currentUser.id) === -1
  }, [members, currentUser])

  return (
    <>
      {Object.keys(inputs).length > 0 && (
        <SimpleFloatingElement
          message={submitMessage}
          sending={isFormSending}
          enabled={isFormValid}
          icon={<Save />}
          onClick={() => onSubmit(inputs, setFormState)}
        />
      )}
      <HouseholdFormHeader
        name={name}
        photo={photo}
        editableRole
        errors={errors}
        inputs={inputs}
        membersCount={members.length}
        isAdmin={currentUser.role === HOUSEHOLD_ROLE_TYPE.ADMIN}
        setFormState={setFormState}
        currentUser={currentUser}
        sendingField={sendingField}
        onLeaveHousehold={canDeleteHousehold ? handleLeaveHousehold : undefined}
        onDeleteHousehold={currentUser.role === HOUSEHOLD_ROLE_TYPE.ADMIN ? handleDeleteHousehold : undefined}
      />

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.MEMBERS_SECTION} />
      </SectionHeadline>
      <Table {...memberTableProps} />

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.INVITE_USERS} />
      </SectionHeadline>
      <HouseholdInvitationForm
        connections={invitableConnections}
        onInvite={id => updateArrayValue('invitedConnections', id)}
      />

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.INVITATIONS} />
      </SectionHeadline>
      <Table {...invitationTableProps} />

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.MODULES} />
      </SectionHeadline>

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.ADD_MODULES} />
      </SectionHeadline>
    </>
  )
}

HouseholdModificationForm.defaultProps = {
  household: {
    photo: '',
    name: '',
    members: [],
    invitations: [],
  },
  connections: [],
}

HouseholdModificationForm.propTypes = {
  household: PropTypes.shape({
    photo: PropTypes.string,
    name: PropTypes.string,
    members: PropTypes.array,
    invitations: PropTypes.array,
  }),
  connections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    photo: PropTypes.string,
  })),
  onSubmit: PropTypes.func.isRequired,
}

export default HouseholdModificationForm
