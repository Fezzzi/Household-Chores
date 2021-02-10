import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PropTypes } from 'prop-types'

import { HomeActions } from 'clientSrc/actions'
import { EmptyContentMessage, HomeWrapper } from 'clientSrc/styles/blocks/home'
import { linkify } from 'clientSrc/helpers/textLinks'
import { HOUSEHOLD_GROUP_KEYS, HOUSEHOLD_KEYS } from 'shared/constants/mappingKeys'
import { HOME } from 'shared/constants/localeMessages'

import { HouseholdSwitch, HouseholdMemberList, HouseholdBody } from './home/'
import { LocaleText } from './common'

const Home = ({ history }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(HomeActions.loadHouseholds())
  }, [])

  const { selectedHousehold, households } = useSelector(({ home }) => home)
  const currentHouseholdIndex = useMemo(() => {
    if (selectedHousehold == null) {
      return households[0]?.[HOUSEHOLD_KEYS.ID]
    }

    return households.findIndex(household => household[HOUSEHOLD_KEYS.ID] === Number(selectedHousehold))
  }, [selectedHousehold, households])

  return (
    <HomeWrapper>
      {currentHouseholdIndex && currentHouseholdIndex !== -1
        ? (
          <>
            <HouseholdSwitch
              history={history}
              householdData={households[currentHouseholdIndex]}
              nextData={households[(currentHouseholdIndex + 1) % households.length]}
              prevData={households[(currentHouseholdIndex + households.length - 1) % households.length]}
            />
            <HouseholdMemberList members={households[currentHouseholdIndex][HOUSEHOLD_GROUP_KEYS.MEMBERS]} />
            <HouseholdBody householdData={households[currentHouseholdIndex]} />
          </>
        ) : (
          <EmptyContentMessage>
            <LocaleText message={HOME.NO_HOUSEHOLD} modifierFunc={text => linkify(text, history)} />
          </EmptyContentMessage>
        )}
    </HomeWrapper>
  )
}

Home.propTypes = {
  history: PropTypes.object.isRequired,
}

export default Home
