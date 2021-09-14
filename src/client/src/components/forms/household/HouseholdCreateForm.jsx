import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import newHouseholdIcon from 'assets/logos/logo-150.png'

import { SectionHeadline } from 'clientSrc/styles/blocks/settings'
import { useInvitationListProps } from 'clientSrc/helpers/household'
import { SUBMIT_TIMEOUT } from 'clientSrc/constants'
import { HouseholdActions } from 'clientSrc/actions'
import { HOUSEHOLD } from 'shared/constants/localeMessages'
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

  const userState = useSelector(({ app: { user } }) => user)
  const currentUser = useMemo(() => ({
    ...userState,
    role: HOUSEHOLD_ROLE_TYPE.ADMIN,
  }), [userState])

  const invitationTableProps = useMemo(() => useInvitationListProps(
    invitations.map(({ toId, toPhoto, toNickname, message }) => ({
      toId,
      toPhoto,
      toNickname,
      fromPhoto: currentUser.photo,
      fromNickname: currentUser.nickname,
      fromId: currentUser.userId,
      message,
      dateCreated: '(PENDING)',
    })),
    toId => setInvitations(prevState => prevState.filter(invitation => invitation.toId !== toId))
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
      userNickname: currentUser.nickname,
      name: 'New Household',
      ...inputs,
    }

    const invitationsData = invitations.map(({ toId, message }) => ({ toId, message }))

    // TODO: Add default photo to user after registering
    if (!inputs.photo) {
      loadImageUrlWithCallback(newHouseholdIcon, 'image/svg+xml', householdPhoto => {
        if (!inputs.userPhoto) {
          loadImageUrlWithCallback(currentUser.photo, `image/${currentUser.photo.split('.').splice(-1)[0]}`, userPhoto => {
            dispatch(HouseholdActions.createHousehold({
              inputs: {
                ...inputsData,
                photo: householdPhoto,
                userPhoto,
              },
              invitations: invitationsData,
            }))
          })
        } else {
          dispatch(HouseholdActions.createHousehold({
            inputs: {
              ...inputsData,
              photo: householdPhoto,
            },
            invitations: invitationsData,
          }))
        }
      })
    } else if (!inputs.userPhoto) {
      loadImageUrlWithCallback(currentUser.photo, `image/${currentUser.photo.split('.').splice(-1)[0]}`, userPhoto => {
        dispatch(HouseholdActions.createHousehold({
          inputs: {
            ...inputsData,
            userPhoto,
          },
          invitations: invitationsData,
        }))
      })
    } else {
      dispatch(HouseholdActions.createHousehold({ inputs: inputsData, invitations: invitationsData }))
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
        connections={connections.filter(({ userId }) => !invitations.find(invitation => invitation.toId === userId))}
        onInvite={(id, message) => {
          const connection = connections.find(connection => connection.userId === id)

          setInvitations(prevState => [
            ...prevState,
            {
              toId: connection.userId,
              toPhoto: connection.photo,
              toNickname: connection.nickname,
              message,
            },
          ])
        }}
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
    userId: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    photo: PropTypes.string,
  })),
}

export default HouseholdCreateForm
