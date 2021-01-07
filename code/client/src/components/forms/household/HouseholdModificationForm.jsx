import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Save } from '@material-ui/icons'

import { SectionHeadline } from 'clientSrc/styles/blocks/settings'
import { HouseholdActions } from 'clientSrc/actions'
import { useFormState } from 'clientSrc/helpers/form'
import { useMemberListProps, useInvitationListProps } from 'clientSrc/helpers/household'
import { HOUSEHOLD } from 'shared/constants/localeMessages'
import { HOUSEHOLD_ROLE_TYPE } from 'shared/constants'
import { SUBMIT_TIMEOUT } from 'clientSrc/constants'
import { HOUSEHOLD_GROUP_KEYS, HOUSEHOLD_KEYS, MEMBER_KEYS, PROFILE } from 'shared/constants/settingsDataKeys'

import HouseholdFormHeader from './HouseholdFormHeader'
import HouseholdInvitationForm from './HouseholdInvitationForm'
import { LocaleText, Table } from '../../common'
import { SimpleFloatingElement } from '../../portals'

const HouseholdModificationForm = ({ household, connections, onSubmit }) => {
  // This state holds information about sending state of leave/delete buttons in household header
  const [sendingField, setSendingField] = useState(null)
  const [newInvitations, setNewInvitations] = useState([])
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

  const {
    [HOUSEHOLD_KEYS.ID]: householdId,
    [HOUSEHOLD_KEYS.PHOTO]: photo,
    [HOUSEHOLD_KEYS.NAME]: name,
    [HOUSEHOLD_GROUP_KEYS.MEMBERS]: members,
    [HOUSEHOLD_GROUP_KEYS.INVITATIONS]: invitations,
  } = household
  const memberTableProps = useMemberListProps(members)
  const invitationTableProps = useInvitationListProps(invitations)

  const userState = useSelector(({ app }) => app.user)
  const currentUser = useMemo(() => {
    const member = members.find(member => member[MEMBER_KEYS.ID] === userState[PROFILE.ID])
    return {
      id: userState[PROFILE.ID],
      photo: member?.[MEMBER_KEYS.PHOTO] ?? userState[PROFILE.PHOTO],
      name: member?.[MEMBER_KEYS.NAME] ?? userState[PROFILE.NAME],
      role: member?.[MEMBER_KEYS.ROLE],
    }
  }, [members, userState])

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
          onClick={onSubmit(inputs, setFormState)}
        />
      )}
      <HouseholdFormHeader
        name={name}
        photo={photo}
        errors={errors}
        inputs={inputs}
        membersCount={members.length}
        setFormState={setFormState}
        currentUser={currentUser}
        sendingField={sendingField}
        onLeaveHousehold={canDeleteHousehold && handleLeaveHousehold}
        onDeleteHousehold={currentUser.role === HOUSEHOLD_ROLE_TYPE.ADMIN && handleDeleteHousehold}
      />

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.MEMBERS_SECTION} />
      </SectionHeadline>
      <Table {...memberTableProps} />

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.INVITE_USERS} />
      </SectionHeadline>
      <HouseholdInvitationForm
        connections={connections.filter(({ id }) => !newInvitations.find(user => user.id === id))}
        onInvite={id => setNewInvitations(prevState => [...prevState, connections.find(user => user.id === id)])}
      />

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.INVITATIONS} />
      </SectionHeadline>
      {/* todo: Add real clickHandlers */}
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
