import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PropTypes } from 'prop-types'

import { HomeActions } from 'clientSrc/actions'
import { EmptyContentMessage, HomeWrapper } from 'clientSrc/styles/blocks/home'
import { linkify } from 'clientSrc/helpers/textLinks'
import { HOME } from 'shared/constants/localeMessages'

// eslint-disable-next-line import/no-useless-path-segments
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
      return households[0]?.householdId ?? null
    }

    const householdIndex = households.findIndex(household => household.householdId === Number(selectedHousehold))
    return householdIndex >= 0
      ? householdIndex
      : null
  }, [selectedHousehold, households])

  return (
    <HomeWrapper>
      {currentHouseholdIndex !== null
        ? (
          <>
            <HouseholdSwitch
              history={history}
              householdData={households[currentHouseholdIndex]}
              nextData={households[(currentHouseholdIndex + 1) % households.length]}
              prevData={households[(currentHouseholdIndex + households.length - 1) % households.length]}
            />
            <HouseholdMemberList members={households[currentHouseholdIndex].members} />
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
