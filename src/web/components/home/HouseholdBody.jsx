import React from 'react'
import PropTypes from 'prop-types'

import { HouseholdBodyBox } from '../../styles/blocks/home'

const HouseholdBody = ({ householdData }) => (
  <HouseholdBodyBox>
    BODY FOR {`'${householdData.name}'`}
  </HouseholdBodyBox>
)

HouseholdBody.propTypes = {
  householdData: PropTypes.object.isRequired,
}

export default HouseholdBody
