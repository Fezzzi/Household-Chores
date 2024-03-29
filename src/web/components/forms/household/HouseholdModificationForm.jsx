import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { HOUSEHOLD } from 'shared/constants/localeMessages'
import { HOUSEHOLD_ROLE_TYPE } from 'shared/constants'
import { formatDate } from 'shared/helpers/date'
import { SaveIcon } from 'web/styles/icons'
import { SectionHeadline } from 'web/styles/blocks/settings'
import { HouseholdActions } from 'web/actions'
import { useFormState, useUpdateHandler } from 'web/helpers/form'
import { useMemberListProps, getInvitationListProps } from 'web/helpers/household'
import { SUBMIT_TIMEOUT } from 'web/constants'

import HouseholdFormHeader from './HouseholdFormHeader'
import HouseholdInvitationForm from './HouseholdInvitationForm'
import { LocaleText, Table } from '../../common'
import { FloatingIcon } from '../../portals'

const HouseholdModificationForm = ({ household, connections, onSubmit }) => {
  const {
    householdId,
    photo,
    name,
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
    onSubmit({ ...inputs, householdId }, setFormState),
  [inputs, setFormState])

  const {
    newInvitations,
    removedInvitations,
    removedMembers,
    changedRoles,
  } = inputs

  const updateHandler = useUpdateHandler(setFormState)

  const updateArrayValue = useCallback((key, value, add = true) => {
    const newValue = (
      inputs[key]?.filter(input => typeof input === 'object'
        ? input?.userId !== value?.userId
        : input !== value)
    ) ?? []
    if (add) {
      newValue.push(value)
    }

    updateHandler(key, true, newValue, null, [])
  }, [newInvitations, removedInvitations, removedMembers, changedRoles, updateHandler])

  const userState = useSelector(({ app: { user } }) => user)
  const currentUser = useMemo(() => {
    const { userId, photo, nickname } = userState
    const member = members.find(member => member.userId === userId)

    return {
      userId,
      photo: member.photo ?? photo,
      nickname: member.nickname ?? nickname,
      role: member.role,
    }
  }, [members, userState])

  const invitableConnections = useMemo(() => connections.filter(({ userId }) =>
    !members.find(member => member.userId === userId)
    && !invitations.find(invitation => invitation.toId === userId)
    && !newInvitations?.find(user => user.userId === userId)
  ), [connections, members, invitations, newInvitations])

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
    useCallback(userId => removedMembers?.includes(userId), [removedMembers]),
    useCallback((userId, role) => {
      const isChangedRole = role !== members.find(member => userId === member.userId)?.role
      if (isChangedRole) {
        updateArrayValue('changedRoles', { userId, role })
      } else {
        updateArrayValue('changedRoles', { userId, role }, false)
      }
    }, [members]),
    userId => updateArrayValue('removedMembers', userId),
    userId => updateArrayValue('removedMembers', userId, false)
  )

  const invitationTableProps = useMemo(() =>
    getInvitationListProps([
      ...(newInvitations
        ? newInvitations.map(({ userId, message }) => {
          const connectedUser = connections.find(connection => connection.userId === userId)
          return {
            fromPhoto: currentUser.photo,
            fromNickname: currentUser.nickname,
            fromId: currentUser.userId,
            toPhoto: connectedUser.photo,
            toNickname: connectedUser.nickname,
            toId: userId,
            message,
            dateCreated: '(PENDING)',
          }
        })
        : []
      ),
      ...invitations.map(({ fromId, toId, toNickname, toPhoto, message, dateCreated }) => {
        const invitor = members.find(member => member.userId === fromId)
        const allowCancellation = removedInvitations?.includes(toId)
        const disableDeletion = allowCancellation || currentUser.role === HOUSEHOLD_ROLE_TYPE.MEMBER

        return invitor && {
          fromPhoto: invitor.photo,
          fromNickname: invitor.nickname,
          fromId,
          toPhoto,
          toNickname,
          toId,
          message,
          dateCreated: formatDate(dateCreated),
          disableDeletion,
          allowCancellation,
        }
      }).filter(Boolean),
    ],
    userId => {
      const isExistingInvitation = invitations.find(invitation => invitation.toId === userId)
      if (isExistingInvitation) {
        updateArrayValue('removedInvitations', userId)
      } else {
        updateArrayValue('newInvitations', { userId }, false)
      }
    },
    userId => updateArrayValue('removedInvitations', userId, false)
    ),
  [newInvitations, removedInvitations, invitations, members, currentUser])

  const dispatch = useDispatch()
  const handleLeaveHousehold = useCallback(() => {
    setSendingField({ [HOUSEHOLD.LEAVE]: HOUSEHOLD.LEAVING })
    dispatch(HouseholdActions.leaveHousehold(householdId))
    setTimer(setTimeout(() => setSendingField && setSendingField(null), SUBMIT_TIMEOUT))
  }, [householdId, dispatch])

  const handleDeleteHousehold = useCallback(() => {
    setSendingField({ [HOUSEHOLD.DELETE]: HOUSEHOLD.DELETING })
    dispatch(HouseholdActions.deleteHousehold(householdId))
    setTimer(setTimeout(() => setSendingField && setSendingField(null), SUBMIT_TIMEOUT))
  }, [householdId, dispatch])

  const canDeleteHousehold = useMemo(() => {
    const admins = members
      .filter(member => member.role === HOUSEHOLD_ROLE_TYPE.ADMIN)
      .map(member => member.userId)
    return admins.length > 1 || admins.indexOf(currentUser.userId) === -1
  }, [members, currentUser])

  const memberAdmins = useMemo(() =>
    members.filter(member => member.role === HOUSEHOLD_ROLE_TYPE.ADMIN),
  [members])

  return (
    <>
      {Object.keys(inputs).length > 0 && (
        <FloatingIcon
          message={submitMessage}
          sending={isFormSending}
          enabled={isFormValid}
          icon={SaveIcon}
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
            onInvite={(userId, message) => updateArrayValue('newInvitations', { userId, message })}
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
    photo: '',
    name: '',
    members: [],
    invitations: [],
  },
  connections: [],
}

HouseholdModificationForm.propTypes = {
  household: PropTypes.shape({
    householdId: PropTypes.number,
    photo: PropTypes.string,
    name: PropTypes.string,
    members: PropTypes.array,
    invitations: PropTypes.array,
  }),
  connections: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    photo: PropTypes.string,
  })),
  onSubmit: PropTypes.func.isRequired,
}

export default HouseholdModificationForm
