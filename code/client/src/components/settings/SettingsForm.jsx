import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { COMMON, FORM } from 'shared/constants/localeMessages';
import { handlerWrapper, updateInput } from 'clientSrc/helpers/form';
import { SUBMIT_TIMEOUT } from 'clientSrc/constants/common';
import { InputRow } from 'clientSrc/styles/blocks/form';
import { SettingsFormInput } from './SettingsFormInput';
import { PrimaryButton, Separator } from '../forms';
import LocaleText from '../common/LocaleText';

export const SettingsForm = ({ category, tab, settings, data }) => {
  const inputEntries = settings
    .reduce((acc, group) => acc.concat(group), [])
    .map(input => [input.name, { valid: false, value: '' }]);

  const [timer, setTimer] = useState(null);
  const [state, setState] = useState({
    category,
    tab,
    submitMessage: FORM.SAVE,
    isFormValid: false,
    isFormSending: false,
    isFormChanged: false,
    inputs: Object.fromEntries(inputEntries),
    errors: {},
  });

  useEffect(() =>
    setState(prevState => ({
      ...prevState,
      category,
      tab,
      isFormValid: false,
      isFormSending: false,
      isFormChanged: false,
      inputs: Object.fromEntries(inputEntries),
      errors: {},
    })), [category, tab]);

  useEffect(() => () => clearTimeout(timer));

  const handleClick = handlerWrapper(() => {
    setState(prevState => ({
      ...prevState,
      isFormSending: true,
      submitMessage: COMMON.SENDING,
    }));

    setTimer(setTimeout(
      () => setState && setState(prevState => ({
        ...prevState,
        isFormSending: false,
        submitMessage: FORM.SAVE,
      })), SUBMIT_TIMEOUT));
  });

  const isFormValidFunc = inputs =>
    Object.values(inputs).every(input => (input.value && input.valid) || !input.value);

  const inputUpdater = name => updateInput(setState, name, isFormValidFunc);

  const { submitMessage, errors, isFormValid, isFormSending, isFormChanged } = state;
  return (
    <>
      {settings.map((group, groupKey) => (
        <Fragment key={groupKey}>
          {groupKey !== 0
            ? <Separator />
            : ''}
          {group.map((inputRow, configKey) => {
            const key = `${groupKey}-${configKey}`;

            return Array.isArray(inputRow)
              ? (
                <InputRow key={key}>
                  {inputRow.map((input, inputKey) => (
                    <SettingsFormInput
                      key={`${key}-${inputKey}`}
                      data={data}
                      input={input}
                      updateInput={inputUpdater}
                      inputError={name => errors[name] || ''}
                      inline
                    />
                  )
                  )}
                </InputRow>
              ) : (
                <SettingsFormInput
                  key={key}
                  data={data}
                  input={inputRow}
                  updateInput={inputUpdater}
                  inputError={name => errors[name] || ''}
                />
              );
          })}
        </Fragment>
      ))}
      {isFormChanged && (
        <>
          <Separator line={false} />
          <InputRow>
            <PrimaryButton disabled={!isFormValid || isFormSending} clickHandler={handleClick} margin={0}>
              <LocaleText message={submitMessage} />
            </PrimaryButton>
          </InputRow>
        </>
      )}
    </>
  );
};

const inputShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  message: PropTypes.string,
});

SettingsForm.propTypes = {
  category: PropTypes.string.isRequired,
  tab: PropTypes.string.isRequired,
  settings: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        inputShape,
        PropTypes.arrayOf(inputShape),
      ])
    )
  ),
  data: PropTypes.object,
};
