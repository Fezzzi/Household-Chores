import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Check } from '@material-ui/icons';

import {
  InputRow, SwitchInputWrapper, SwitchInputBox, SwitchInputField, InputLabel, SwitchInputLabel, FixedInputRow,
} from 'clientSrc/styles/blocks/form';

import LocaleText from '../../common/LocaleText';

class SwitchInputComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputActive: false,
      isOn: props.placeholder !== '' || false,
    };
  }

  handleInputChange = () => {
    const { updateInput } = this.props;
    const { isOn } = this.state;

    this.setState({
      isOn: !isOn,
    });

    updateInput(true, !isOn);
  };

  getInputBody() {
    const {name, label, hasError} = this.props;
    const {isOn, inputActive} = this.state;

    return (
      <>
        <InputLabel>
          <LocaleText message={label}/>
        </InputLabel>
        <SwitchInputWrapper active={inputActive}>
          <SwitchInputBox htmlFor={name}>
            <SwitchInputLabel>
              {isOn && <Check/>}
            </SwitchInputLabel>
            <SwitchInputField
              name={name}
              type="checkbox"
              onChange={this.handleInputChange}
              onFocus={() => this.setState({inputActive: true})}
              onBlur={() => this.setState({inputActive: false})}
              noValidate
            />
          </SwitchInputBox>
        </SwitchInputWrapper>
      </>
    );
  }

  render() {
    const { fixed, half } = this.props;
    const body = this.getInputBody();

    return (
      <InputRow>
        {fixed
          ? <FixedInputRow half={half}>{body}</FixedInputRow>
          : body}
      </InputRow>
    );
  }
}

SwitchInputComponent.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  fixed: PropTypes.bool,
  half: PropTypes.bool,
  hasError: PropTypes.bool.isRequired,
  updateInput: PropTypes.func,
};

export default SwitchInputComponent;
