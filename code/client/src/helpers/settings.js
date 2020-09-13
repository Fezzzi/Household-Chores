import React, {Fragment, Component, useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import { Input, PrimaryButton, Separator } from 'clientSrc/components/forms';
import { COMMON, FORM } from 'shared/constants/localeMessages';
import { handlerWrapper, updateInput } from 'clientSrc/helpers/auth';
import LocaleText from 'clientSrc/components/common/LocaleText';
import { SUBMIT_TIMEOUT } from 'clientSrc/constants/common';
import { InputRow } from 'clientSrc/styles/blocks/form';

export const renderFormFromConfig = (category, tab, settings) => data =>
  <SettingsForm category={category} tab={tab} settings={settings} data={data} />;

const SettingsForm = ({ category, tab, settings, data }) => {
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

  useEffect(() => {
    return () => clearTimeout(timer)
  });

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

  const renderFormInput = ({ name, dataKey, ...props }, key, inline = false) => {
    const { errors } = state;

    return (
      <Input
        key={key}
        name={name}
        placeholder={(dataKey && data[dataKey]) || ''}
        inline={inline}
        hasError={!!errors[name]}
        updateInput={updateInput(setState, name, isFormValidFunc)}
        {...props}
      />
    );
  };

  const { submitMessage, isFormValid, isFormSending, isFormChanged } = state;
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
                      {renderFormInput(input, `${key}-${inputKey}`, true)}
                    </Fragment>
                  ))}
                </InputRow>
              );
            }
            return renderFormInput(inputRow, key);
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

SettingsForm.propTypes = ({
  category: PropTypes.string.isRequired,
  tab: PropTypes.string.isRequired,
  settings: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      message: PropTypes.string,
    }))
  ),
  data: PropTypes.object,
});
