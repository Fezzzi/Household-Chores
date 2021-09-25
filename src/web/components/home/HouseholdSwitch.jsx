import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { API, SETTING_CATEGORIES } from 'shared/constants'
import { HomeActions } from 'web/actions'
import { clickableStyle, SvgIcon } from 'web/styles/blocks/common'
import { SettingsIcon } from 'web/styles/icons'
import { FormHeader, FormHeaderPhoto, FormHeaderTitle } from 'web/styles/blocks/form'

import { Link } from '../common'

const HouseholdSwitch = ({ householdData, nextData, prevData }) => {
  const dispatch = useDispatch()

  const handleHouseholdSelection = useCallback(householdId =>
    dispatch(HomeActions.changeSelectedHousehold(householdId))
  , [dispatch])

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
        <Link route={`/${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=${householdData.key}`}>
          <HouseholdSwitchSettingsIcon>
            <SettingsIcon />
          </HouseholdSwitchSettingsIcon>
        </Link>
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
  householdData: PropTypes.object.isRequired,
  nextData: PropTypes.object.isRequired,
  prevData: PropTypes.object.isRequired,
}

export default HouseholdSwitch

const HouseholdSwitchSettingsIcon = styled(SvgIcon)`
  position: absolute;
  z-index: 5;
  top: -5px;
  right: -5px;
  width: 25px;
  height: 25px;
  opacity: 0.5;

  ${clickableStyle}
`

const HouseholdSwitchPhotoBox = styled.div`
  position: relative;
`

const ArrowHouseholdPreview = styled.img`
  width: 40px;
  height: 40px;
  margin: 10px;
  border-radius: 50%;
  transition: width 0.4s ease 0s, height 0.4s ease 0s, margin 0.4s ease 0s;
`

const HomeSwitchArrow = styled.div`
  position: absolute;
  top: inherit;
  display: flex;
  flex-flow: row;
  align-items: center;
  width: 84px;
  height: 60px;
  opacity: 0.1;
  user-select: none;
  transition: opacity 0.5s ease 0s;

  ${clickableStyle}
  :hover {    
    > img {
      width: 50px;
      height: 50px;
      margin: 5px;
    }
  }
  
  > svg {
    width: 20px;
    height: 30px;
  }
`

const ToggleLeftArrow = styled(HomeSwitchArrow)`
  left: 50px;
  justify-content: flex-start;
`

const ToggleRightArrow = styled(HomeSwitchArrow)`
  right: 50px;
  justify-content: flex-end;
`
