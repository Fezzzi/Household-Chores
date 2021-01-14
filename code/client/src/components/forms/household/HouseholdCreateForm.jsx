import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import newHouseholdIcon from '~/static/icons/icon-150.png'

import { SectionHeadline } from 'clientSrc/styles/blocks/settings'
import { useInvitationListProps } from 'clientSrc/helpers/household'
import { SUBMIT_TIMEOUT } from 'clientSrc/constants'
import { HouseholdActions } from 'clientSrc/actions'
import { HOUSEHOLD } from 'shared/constants/localeMessages'
import { CONNECTION_KEYS, HOUSEHOLD_GROUP_KEYS, HOUSEHOLD_KEYS, PROFILE } from 'shared/constants/settingsDataKeys'
import { HOUSEHOLD_ROLE_TYPE } from 'shared/constants'

import HouseholdFormHeader from './HouseholdFormHeader'
import HouseholdInvitationForm from './HouseholdInvitationForm'
import { LocaleText, Table } from '../../common'

const HouseholdCreateForm = ({ connections }) => {
  const [timer, setTimer] = useState(null)
  const [state, setState] = useState({
    isFormSending: false,
    inputs: {},
    errors: {},
  })
  const [invitations, setInvitations] = useState([])

  useEffect(() => () => timer && clearTimeout(timer), [])

  const { inputs, errors, isFormSending } = state

  const userState = useSelector(({ app }) => app.user)
  const currentUser = useMemo(() => ({
    id: userState[PROFILE.ID],
    photo: userState[PROFILE.PHOTO],
    name: userState[PROFILE.NAME],
    role: HOUSEHOLD_ROLE_TYPE.ADMIN,
  }), [userState])

  const invitationTableProps = useMemo(() => useInvitationListProps(
    invitations.map(user => ({
      toPhoto: user.photo,
      toNickname: user.nickname,
      toId: user.id,
      fromPhoto: currentUser.photo,
      fromNickname: currentUser.name,
      fromId: currentUser.id,
      dateCreated: '(PENDING)',
    })),
    toId => setInvitations(prevState => prevState.filter(user => user.id !== toId))
  ), [connections, invitations])

  const loadImageUrlWithCallback = (image, type, callback) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.onload = () => {
      canvas.height = img.height
      canvas.width = img.width
      ctx.drawImage(img, 0, 0)
      const dataUrl = canvas.toDataURL(type)
      callback({
        type,
        size: dataUrl.length,
        name: image,
        data: dataUrl,
      })
    }
    img.src = image
  }

  const dispatch = useDispatch()
  const handleCreateHousehold = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      isFormSending: true,
    }))

    const inputsData = {
      [HOUSEHOLD_KEYS.USER_NAME]: currentUser.name,
      [HOUSEHOLD_KEYS.NAME]: 'New Household',
      ...inputs,
    }

    // TODO: Add default photo to user after registering
    if (!inputs[HOUSEHOLD_KEYS.PHOTO]) {
      loadImageUrlWithCallback(newHouseholdIcon, 'image/svg+xml', householdPhoto => {
        if (!inputs[HOUSEHOLD_KEYS.USER_PHOTO]) {
          loadImageUrlWithCallback(currentUser.photo, `image/${currentUser.photo.split('.').splice(-1)[0]}`, userPhoto => {
            dispatch(HouseholdActions.createHousehold({
              inputs: {
                ...inputsData,
                [HOUSEHOLD_KEYS.PHOTO]: householdPhoto,
                [HOUSEHOLD_KEYS.USER_PHOTO]: userPhoto,
              },
              [HOUSEHOLD_GROUP_KEYS.INVITATIONS]: invitations,
            }))
          })
        } else {
          dispatch(HouseholdActions.createHousehold({
            inputs: {
              ...inputsData,
              [HOUSEHOLD_KEYS.PHOTO]: householdPhoto,
            },
            [HOUSEHOLD_GROUP_KEYS.INVITATIONS]: invitations,
          }))
        }
      })
    } else if (!inputs[HOUSEHOLD_KEYS.USER_PHOTO]) {
      loadImageUrlWithCallback(currentUser.photo, `image/${currentUser.photo.split('.').splice(-1)[0]}`, userPhoto => {
        dispatch(HouseholdActions.createHousehold({
          inputs: {
            ...inputsData,
            [HOUSEHOLD_KEYS.USER_PHOTO]: userPhoto,
          },
          [HOUSEHOLD_GROUP_KEYS.INVITATIONS]: invitations,
        }))
      })
    } else {
      dispatch(HouseholdActions.createHousehold({ inputs: inputsData, [HOUSEHOLD_GROUP_KEYS.INVITATIONS]: invitations }))
    }

    setTimer(setTimeout(
      () => setState && setState(prevState => ({
        ...prevState,
        isFormSending: false,
      })), SUBMIT_TIMEOUT))
  }, [dispatch, currentUser, inputs, invitations])

  return (
    <>
      <HouseholdFormHeader
        name="New Household"
        photo={newHouseholdIcon}
        errors={errors}
        inputs={inputs}
        currentUser={currentUser}
        setFormState={setState}
        membersCount={0}
        isAdmin
        sendingField={isFormSending ? { [HOUSEHOLD.CREATE]: HOUSEHOLD.CREATING } : null}
        onCreateHousehold={handleCreateHousehold}
      />

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.INVITE_USERS} />
      </SectionHeadline>
      <HouseholdInvitationForm
        connections={connections.filter(({ id }) => !invitations.find(user => user.id === id))}
        onInvite={id => setInvitations(prevState =>
          [...prevState, connections.find(user => user[CONNECTION_KEYS.ID] === id)]
        )}
      />

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.INVITATIONS} />
      </SectionHeadline>
      <Table {...invitationTableProps} />

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.ADD_MODULES} />
      </SectionHeadline>
    </>
  )
}

HouseholdCreateForm.defaultProps = {
  connections: [],
}

HouseholdCreateForm.propTypes = {
  connections: PropTypes.arrayOf(PropTypes.shape({
    [CONNECTION_KEYS.ID]: PropTypes.number.isRequired,
    [CONNECTION_KEYS.NICKNAME]: PropTypes.string.isRequired,
    [CONNECTION_KEYS.PHOTO]: PropTypes.string,
  })),
}

export default HouseholdCreateForm
