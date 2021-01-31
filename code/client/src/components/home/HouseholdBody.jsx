import React from 'react'
import PropTypes from 'prop-types'

import { HouseholdBodyBox } from 'clientSrc/styles/blocks/home'
import { HOUSEHOLD_KEYS } from 'shared/constants/mappingKeys'

const HouseholdBody = ({ householdData }) => (
  <HouseholdBodyBox>
    BODY FOR {`'${householdData[HOUSEHOLD_KEYS.NAME]}'`}
  </HouseholdBodyBox>
)

HouseholdBody.propTypes = {
  householdData: PropTypes.object.isRequired,
}

export default HouseholdBody
