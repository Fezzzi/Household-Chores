import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { HOME } from 'shared/constants/localeMessages'
import { EmptyContentMessage, HomeWrapper } from 'web/styles/blocks/home'

import HouseholdSwitch from './HouseholdSwitch'
import HouseholdMemberList from './HouseholdMemberList'
import HouseholdBody from './HouseholdBody'
import { HomeActions } from '../../actions'
import { LocaleText } from '../common'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(HomeActions.loadHouseholds())
  }, [dispatch])

  const { selectedHousehold, households } = useSelector(({ home }) => home)
  const currentHouseholdIndex = useMemo(() => {
    if (households === null) {
      return null
    }

    if (households.length > 0) {
      if (selectedHousehold == null) {
        dispatch(HomeActions.changeSelectedHousehold(households[0].householdId))
        return households[0].householdId
      }

      const householdIndex = households.findIndex(household => household.householdId === Number(selectedHousehold))
      if (householdIndex === -1) {
        dispatch(HomeActions.changeSelectedHousehold(households[0].householdId))
        return households[0].householdId
      }

      return householdIndex
    }

    if (selectedHousehold !== null) {
      dispatch(HomeActions.changeSelectedHousehold(null))
    }
    return null
  }, [selectedHousehold, households, dispatch])

  if (households === null) {
    // todo: Maybe put some throbber here later
    return null
  }

  return (
    <HomeWrapper>
      {households.length > 0
        ? (
          <>
            <HouseholdSwitch
              householdData={households[currentHouseholdIndex]}
              nextData={households[(currentHouseholdIndex + 1) % households.length]}
              prevData={households[(currentHouseholdIndex + households.length - 1) % households.length]}
            />
            <HouseholdMemberList members={households[currentHouseholdIndex].members} />
            <HouseholdBody householdData={households[currentHouseholdIndex]} />
          </>
        ) : (
          <EmptyContentMessage>
            <LocaleText message={HOME.NO_HOUSEHOLD} />
          </EmptyContentMessage>
        )}
    </HomeWrapper>
  )
}

export default Home
