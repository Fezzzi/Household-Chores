import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

import { Input, PrimaryButton, Separator } from 'clientSrc/components/forms';
import { COMMON, FORM } from 'shared/constants/localeMessages';
import { handlerWrapper, updateInput } from 'clientSrc/helpers/auth';
import LocaleText from 'clientSrc/components/common/LocaleText';
import { SUBMIT_TIMEOUT } from 'clientSrc/constants/common';
import { InputRow } from 'clientSrc/styles/blocks/form';

export const renderFormFromConfig = settings => data => <SettingsForm settings={settings} data={data} />;

class SettingsForm extends Component {
  constructor(props) {
    super(props);
    const inputs = props.settings.reduce((acc, group) => acc.concat(group), []);

    this.timer = null;
    this.state = {
      submitMessage: FORM.SAVE,
      isFormValid: false,
      isFormSending: false,
      isFormChanged: false,
      inputs: Object.fromEntries(inputs.map(input =>
        [input.name, { valid: false, value: '' }]
      )),
      errors: {},
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleClick = handlerWrapper(() => {
    this.setState({
      isFormSending: true,
      submitMessage: COMMON.SENDING,
    });
    this.timer = setTimeout(
      () => this && this.setState({
        isFormSending: false,
        submitMessage: FORM.SAVE,
      }), SUBMIT_TIMEOUT
    );
  });

  isFormValidFunc = inputs => Object.values(inputs).every(input => (input.value && input.valid) || !input.value);

  renderFormInput = ({ name, dataKey, ...props }, key, inline = false) => {
    const { data } = this.props;
    const { errors } = this.state;

    return (
      <Input
        key={key}
        name={name}
        placeholder={(dataKey && data[dataKey]) || ''}
        inline={inline}
        hasError={!!errors[name]}
        updateInput={updateInput(this.setState.bind(this), name, this.isFormValidFunc)}
        {...props}
      />
    );
  };

  render() {
    const { settings } = this.props;
    const { submitMessage, isFormValid, isFormSending, isFormChanged } = this.state;

    return (
      <>
        {settings.map((group, groupKey) => (
          <Fragment key={groupKey}>
            {groupKey !== 0
              ? <Separator />
              : ''}
            {group.map((inputRow, configKey) => {
              const key = `${groupKey}-${configKey}`;

              if (Array.isArray(inputRow)) {
                return (
                  <InputRow key={key}>
                    {inputRow.map((input, inputKey) => (
                      <Fragment key={`${key}-${inputKey}`}>
                        {this.renderFormInput(input, `${key}-${inputKey}`, true)}
                      </Fragment>
                    ))}
                  </InputRow>
                );
              }
              return this.renderFormInput(inputRow, key);
            })}
          </Fragment>
        ))}
        {isFormChanged && (
          <>
            <Separator line={false} />
            <InputRow>
              <PrimaryButton disabled={!isFormValid || isFormSending} clickHandler={this.handleClick} margin={0}>
                <LocaleText message={submitMessage} />
              </PrimaryButton>
            </InputRow>
          </>
        )}
      </>
    );
  }
}

SettingsForm.propTypes = ({
  settings: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      message: PropTypes.string,
    }))
  ),
  data: PropTypes.object,
});
