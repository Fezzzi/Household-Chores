import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Settings } from '@material-ui/icons'

import { HomeActions } from 'clientSrc/actions'
import { FormHeader, FormHeaderPhoto, FormHeaderTitle } from 'clientSrc/styles/blocks/form'
import {
  ArrowHouseholdPreview, HouseholdSwitchPhotoBox, HouseholdSwitchSettingsLink, ToggleLeftArrow, ToggleRightArrow,
} from 'clientSrc/styles/blocks/home'
import { HOUSEHOLD_KEYS } from 'shared/constants/mappingKeys'
import { API, SETTING_CATEGORIES } from 'shared/constants'

const HouseholdSwitch = ({ history, householdData, nextData, prevData }) => {
  const dispatch = useDispatch()
  const handleHouseholdSelection = useCallback(householdId =>
    dispatch(HomeActions.changeSelectedHousehold(householdId)), [dispatch]
  )

  const showArrows = householdData[HOUSEHOLD_KEYS.ID] !== nextData[HOUSEHOLD_KEYS.ID]

  const {
    [HOUSEHOLD_KEYS.NAME]: householdName,
    [HOUSEHOLD_KEYS.PHOTO]: householdPhoto,
  } = householdData

  return (
    <FormHeader>
      {showArrows && (
        <ToggleLeftArrow onClick={() => handleHouseholdSelection(prevData[HOUSEHOLD_KEYS.ID])}>

          <svg viewBox="0 0 5 10">
            <path d="M5 0l-5 5 5 5V7z" />
          </svg>
          <ArrowHouseholdPreview src={prevData[HOUSEHOLD_KEYS.PHOTO]} alt="prev household" />
        </ToggleLeftArrow>
      )}

      <HouseholdSwitchPhotoBox>
        <HouseholdSwitchSettingsLink onClick={() => history.push(
          `/${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=${householdData[HOUSEHOLD_KEYS.KEY]}`)}
        >
          <Settings />
        </HouseholdSwitchSettingsLink>
        <FormHeaderPhoto src={householdPhoto} />
      </HouseholdSwitchPhotoBox>
      <FormHeaderTitle>
        {householdName}
      </FormHeaderTitle>

      {showArrows && (
        <ToggleRightArrow onClick={() => handleHouseholdSelection(nextData[HOUSEHOLD_KEYS.ID])}>
          <ArrowHouseholdPreview src={nextData[HOUSEHOLD_KEYS.PHOTO]} alt="next household" />
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
