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
  HOUSEHOLD_KEYS, INVITATION_KEYS,
} from 'shared/constants/mappingKeys'

import HouseholdFormHeader from './HouseholdFormHeader'
import HouseholdInvitationForm from './HouseholdInvitationForm'
import { LocaleText, Table } from '../../common'
import { SimpleFloatingElement } from '../../portals'

const HouseholdModificationForm = ({ household, connections, onSubmit }) => {
  const {
    [HOUSEHOLD_KEYS.ID]: householdId,
    [HOUSEHOLD_KEYS.PHOTO]: photo,
    [HOUSEHOLD_KEYS.NAME]: name,
    members,
    invitations,
  } = household

  // This state holds information about sending state of leave/delete buttons in household header
  const [sendingField, setSendingField] = useState(null)
  const [timer, setTimer] = useState(0)
  const [headerKey, setHeaderKey] = useState(0)

  useEffect(() => {
    setHeaderKey(prevState => prevState + 1)
  }, [household])

  useEffect(() => () => timer && clearTimeout(timer), [])
  const {
    submitMessage,
    isFormValid,
    isFormSending,
    inputs,
    errors,
    setFormState,
  } = useFormState([household, connections])

  const handleSubmit = useCallback(() =>
    onSubmit({ ...inputs, [HOUSEHOLD_KEYS.ID]: householdId }, setFormState),
  [inputs, setFormState])

  const {
    [HOUSEHOLD_KEYS.INVITED_CONNECTIONS]: invitedConnections,
    [HOUSEHOLD_KEYS.REMOVED_INVITATIONS]: removedInvitations,
    [HOUSEHOLD_KEYS.REMOVED_MEMBERS]: removedMembers,
    [HOUSEHOLD_KEYS.CHANGED_ROLES]: changedRoles,
  } = inputs
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
    const { id, photo, nickname } = userState
    const member = members.find(member => member.userId === id)
    return {
      id,
      photo: member.photo ?? photo,
      nickname: member.nickname ?? nickname,
      role: member.role,
    }
  }, [members, userState])

  const invitableConnections = useMemo(() => connections.filter(({ id }) =>
    !members.find(member => member.userId === id)
    && !invitations.find(invitation => invitation[INVITATION_KEYS.TO_ID] === id)
    && !invitedConnections?.find(user => user.id === id)
  ), [connections, members, invitations, invitedConnections])

  const memberTableProps = useMemberListProps(
    members.map(({ userId, role, photo, dateJoined, nickname }) => ({
      memberId: userId,
      memberRole: role,
      changedRole: changedRoles?.find(obj => obj.userId === userId)?.role,
      memberPhoto: photo,
      memberDateJoined: dateJoined,
      memberName: nickname,
    })),
    currentUser,
    useCallback(toId => removedMembers?.includes(toId), [removedMembers]),
    useCallback((toId, role) => {
      const isChangedRole = role !== members.find(member => toId === member.userId)?.role
      if (isChangedRole) {
        updateArrayValue(HOUSEHOLD_KEYS.CHANGED_ROLES, { userId: toId, role })
      } else {
        updateArrayValue(HOUSEHOLD_KEYS.CHANGED_ROLES, { userId: toId, role }, false)
      }
    }, [members]),
    toId => updateArrayValue(HOUSEHOLD_KEYS.REMOVED_MEMBERS, toId),
    toId => updateArrayValue(HOUSEHOLD_KEYS.REMOVED_MEMBERS, toId, false)
  )

  const invitationTableProps = useMemo(() =>
    useInvitationListProps([
      ...(invitedConnections
        ? invitedConnections.map(({ id, message }) => {
          const connectedUser = connections.find(user => user.id === id)
          return {
            fromPhoto: currentUser.photo,
            fromNickname: currentUser.nickname,
            fromId: currentUser.id,
            toPhoto: connectedUser.photo,
            toNickname: connectedUser.nickname,
            toId: id,
            message,
            dateCreated: '(PENDING)',
          }
        })
        : []
      ),
      ...invitations.map(invitation => {
        const invitor = members.find(member => member.userId === invitation[INVITATION_KEYS.FROM_ID])
        const allowCancellation = removedInvitations?.includes(invitation[INVITATION_KEYS.TO_ID])
        const disableDeletion = allowCancellation || currentUser.role === HOUSEHOLD_ROLE_TYPE.MEMBER
        return invitor && {
          fromPhoto: invitor.photo,
          fromNickname: invitor.nickname,
          fromId: invitation[INVITATION_KEYS.FROM_ID],
          toPhoto: invitation[INVITATION_KEYS.TO_PHOTO],
          toNickname: invitation[INVITATION_KEYS.TO_NICKNAME],
          toId: invitation[INVITATION_KEYS.TO_ID],
          message: invitation[INVITATION_KEYS.MESSAGE],
          dateCreated: formatDate(invitation[INVITATION_KEYS.DATE_CREATED]),
          disableDeletion,
          allowCancellation,
        }
      }).filter(Boolean),
    ],
    toId => {
      const isExistingInvitation = invitations.find(invitation => invitation[INVITATION_KEYS.TO_ID] === toId)
      if (isExistingInvitation) {
        updateArrayValue(HOUSEHOLD_KEYS.REMOVED_INVITATIONS, toId)
      } else {
        updateArrayValue(HOUSEHOLD_KEYS.INVITED_CONNECTIONS, { id: toId }, false)
      }
    },
    toId => updateArrayValue(HOUSEHOLD_KEYS.REMOVED_INVITATIONS, toId, false)
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
      .filter(member => member.role === HOUSEHOLD_ROLE_TYPE.ADMIN)
      .map(member => member.userId)
    return admins.length > 1 || admins.indexOf(currentUser.id) === -1
  }, [members, currentUser])

  const memberAdmins = useMemo(() =>
    members.filter(member => member.role === HOUSEHOLD_ROLE_TYPE.ADMIN),
  [members])

  return (
    <>
      {Object.keys(inputs).length > 0 && (
        <SimpleFloatingElement
          message={submitMessage}
          sending={isFormSending}
          enabled={isFormValid}
          icon={<Save />}
          onClick={handleSubmit}
        />
      )}
      <HouseholdFormHeader
        key={`profileFormHeader-${headerKey}`}
        name={name}
        photo={photo}
        editableRole={currentUser.role !== HOUSEHOLD_ROLE_TYPE.ADMIN || memberAdmins.length > 1}
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

      {currentUser.role !== HOUSEHOLD_ROLE_TYPE.MEMBER && (
        <>
          <SectionHeadline>
            <LocaleText message={HOUSEHOLD.INVITE_USERS} />
          </SectionHeadline>
          <HouseholdInvitationForm
            connections={invitableConnections}
            onInvite={(id, message) => updateArrayValue(HOUSEHOLD_KEYS.INVITED_CONNECTIONS, { id, message })}
          />
        </>
      )}

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
    [HOUSEHOLD_KEYS.PHOTO]: '',
    [HOUSEHOLD_KEYS.NAME]: '',
    members: [],
    invitations: [],
  },
  connections: [],
}

HouseholdModificationForm.propTypes = {
  household: PropTypes.shape({
    [HOUSEHOLD_KEYS.ID]: PropTypes.number,
    [HOUSEHOLD_KEYS.PHOTO]: PropTypes.string,
    [HOUSEHOLD_KEYS.NAME]: PropTypes.string,
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
