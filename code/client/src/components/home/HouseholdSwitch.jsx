import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Settings } from '@material-ui/icons'

import { HomeActions } from 'clientSrc/actions'
import { FormHeader, FormHeaderPhoto, FormHeaderTitle } from 'clientSrc/styles/blocks/form'
import {
  ArrowHouseholdPreview, HouseholdSwitchPhotoBox, HouseholdSwitchSettingsLink, ToggleLeftArrow, ToggleRightArrow,
} from 'clientSrc/styles/blocks/home'
import { API, SETTING_CATEGORIES } from 'shared/constants'

const HouseholdSwitch = ({ history, householdData, nextData, prevData }) => {
  const dispatch = useDispatch()
  const handleHouseholdSelection = useCallback(householdId =>
    dispatch(HomeActions.changeSelectedHousehold(householdId)), [dispatch]
  )

  const showArrows = householdData.householdId !== nextData.householdId

  const { name, photo } = householdData

  return (
    <FormHeader>
      {showArrows && (
        <ToggleLeftArrow onClick={() => handleHouseholdSelection(prevData.householdId)}>

          <svg viewBox="0 0 5 10">
            <path d="M5 0l-5 5 5 5V7z" />
          </svg>
          <ArrowHouseholdPreview src={prevData.photo} alt="prev household" />
        </ToggleLeftArrow>
      )}

      <HouseholdSwitchPhotoBox>
        <HouseholdSwitchSettingsLink onClick={() => history.push(
          `/${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=${householdData.key}`)}
        >
          <Settings />
        </HouseholdSwitchSettingsLink>
        <FormHeaderPhoto src={photo} />
      </HouseholdSwitchPhotoBox>
      <FormHeaderTitle>
        {name}
      </FormHeaderTitle>

      {showArrows && (
        <ToggleRightArrow onClick={() => handleHouseholdSelection(nextData.householdId)}>
          <ArrowHouseholdPreview src={nextData.photo} alt="next household" />
          <svg viewBox="5 0 5 10">
            <path d="M5 10l5 -5 -5 -5v10z" />
          </svg>
        </ToggleRightArrow>
      )}
    </FormHeader>
  )
}

HouseholdSwitch.propTypes = {
  history: PropTypes.object.isRequired,
  householdData: PropTypes.object.isRequired,
  nextData: PropTypes.object.isRequired,
  prevData: PropTypes.object.isRequired,
}

export default HouseholdSwitch
