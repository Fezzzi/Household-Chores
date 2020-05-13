import React from 'react';
import { connect } from 'react-redux';
import * as TestActions from 'clientSrc/actions/testActions';
import { Dispatch } from 'redux';

const buttonStyle = {
  color: 'cyan',
};

const divStyle = {
  paddingLeft: '25px',
};

const TestComponent = (props: { testData: any; getData: () => any; clearData: () => any}) => {
  const { testData, getData, clearData } = props;
  return (
    <>
      <button style={buttonStyle} onClick={() => getData()}>
        Get Data
      </button>
      <button style={buttonStyle} onClick={() => clearData()}>
        Clear State
      </button>
      <div>
        Databases ({testData.databases.length}):<br />
        {testData.databases.map((database: string) =>
          <div key={database} style={divStyle}>{database}</div>)}
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  testData: state.test,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getData: () => dispatch(TestActions.getData()),
  clearData: () => dispatch(TestActions.clearData()),
});

export const Test = connect(mapStateToProps, mapDispatchToProps)(TestComponent);
