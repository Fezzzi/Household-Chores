import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as TestActions from 'clientSrc/actions/testActions';

const buttonStyle = {
  color: 'cyan',
};

const divStyle = {
  paddingLeft: '25px',
};

const TestComponent = ({ testData: { databases }, getData, clearData }) => (
  <>
    <button style={buttonStyle} onClick={() => getData()}>
      Get Data
    </button>
    <button style={buttonStyle} onClick={() => clearData()}>
      Clear State
    </button>
    <div>
      Databases ({databases.length}):<br />
      {databases.map(database =>
        <div key={database} style={divStyle}>{database}</div>)}
    </div>
  </>
);

TestComponent.propTypes = {
  testData: PropTypes.shape({
    databases: PropTypes.arrayOf(PropTypes.string),
  }),
  getData: PropTypes.func,
  clearData: PropTypes.func,
};

const mapStateToProps = state => ({
  testData: state.test,
});

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(TestActions.getData()),
  clearData: () => dispatch(TestActions.clearData()),
});

export const Test = connect(mapStateToProps, mapDispatchToProps)(TestComponent);
