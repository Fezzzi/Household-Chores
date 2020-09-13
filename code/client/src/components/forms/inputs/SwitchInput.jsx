import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Check } from '@material-ui/icons';

import {
  InputRow, SwitchInputWrapper, SwitchInputBox, SwitchInputField,
  InputLabel, SwitchInputLabel, FixedInputBlock,
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
    const { name, label, fixedProps, hasError } = this.props;
    const { isOn, inputActive } = this.state;

    return (
      <FixedInputBlock {...fixedProps}>
        <InputLabel>
          <LocaleText message={label} />
        </InputLabel>
        <SwitchInputWrapper active={inputActive}>
          <SwitchInputBox htmlFor={name}>
            <SwitchInputLabel>
              {isOn && <Check />}
            </SwitchInputLabel>
            <SwitchInputField
              name={name}
              type="checkbox"
              onChange={this.handleInputChange}
              onFocus={() => this.setState({ inputActive: true })}
              onBlur={() => this.setState({ inputActive: false })}
              noValidate
            />
          </SwitchInputBox>
        </SwitchInputWrapper>
      </FixedInputBlock>
    );
  }

  render() {
    const { inline } = this.props;
    const body = this.getInputBody();

    return inline
      ? body
      : (
        <InputRow>
          {body}
        </InputRow>
      );
  }
}

SwitchInputComponent.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  inline: PropTypes.bool,
  fixedProps: PropTypes.object,
  hasError: PropTypes.bool.isRequired,
  updateInput: PropTypes.func,
};

export default SwitchInputComponent;
