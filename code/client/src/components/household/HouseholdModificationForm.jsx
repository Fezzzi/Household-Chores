import React from 'react';
import PropTypes from 'prop-types';

const HouseholdModificaionForm = ({ household, tab, setData }) => {
  console.log(household, tab);
  return (
    <>
      lalala
    </>
  )
};

HouseholdModificaionForm.propTypes = {
  household: PropTypes.shape({

  }).isRequired,
  setData: PropTypes.func.isRequired,
};

export default HouseholdModificaionForm;
