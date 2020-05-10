import  React from 'react';
import { connect } from 'react-redux';
import * as TestActions from 'clientSrc/actions/testActions';
import { Dispatch } from "redux";

const buttonStyle = {
    color: 'cyan',
};

const TestComponent = ( prop:{getData : any}) => {
   return ( <button style={buttonStyle}
            onClick={() => prop.getData()}>Display data</button>)
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getData: () => dispatch(TestActions.getData()),
});

export const Test = connect(mapDispatchToProps)(TestComponent);
