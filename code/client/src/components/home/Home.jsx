import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { HomeActions } from 'clientSrc/actions'
import { EmptyContentMessage, HomeWrapper } from 'clientSrc/styles/blocks/home'
import { HOME } from 'shared/constants/localeMessages'

import HouseholdSwitch from './HouseholdSwitch'
import HouseholdMemberList from './HouseholdMemberList'
import HouseholdBody from './HouseholdBody'
import { ActivityFeed } from './ActivityFeed'
import { LocaleText } from '../common'

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(HomeActions.loadHouseholds())
  }, [])

  const { selectedHousehold, households } = useSelector(({ home }) => home)
  const currentHouseholdIndex = useMemo(() => {
    if (households.length) {
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

  return (
    <HomeWrapper>
      <ActivityFeed />
      {currentHouseholdIndex !== null
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
