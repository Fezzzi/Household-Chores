import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as SettingsActions from 'clientSrc/actions/settingsActions';
import { SUBMIT_TIMEOUT } from 'clientSrc/constants/common';

export const updateInput = (
  setState,
  input,
  formValidFunc = inputs => Object.values(inputs).every(i => i.valid),
  formChangedFunc = inputs => Object.values(inputs).find(i => i.value),
) => (isValid, value, errorMessage) => {
  setState(prevState => {
    const inputs = {
      ...prevState.inputs,
      [input]: {
        valid: isValid,
        value,
      },
    };

    const isFormValid = formValidFunc(inputs);
    const errors = {
      ...prevState.errors,
      [input]: isValid || !value ? '' : errorMessage,
    };

    return {
      ...prevState,
      isFormValid,
      isFormChanged: formChangedFunc(inputs),
      inputs,
      errors,
    };
  });
};

export const updateHandler = (name, setFormState, formValidFunc, placeholder) => (isValid, value, errorMessage) => {
  setFormState(prevState => {
    const newInputs = { ...prevState.inputs };
    if (value !== '' && (placeholder === undefined || value !== placeholder)) {
      newInputs[name] = value;
    } else {
      delete newInputs[name];
    }

    const newErrors = { ...prevState.errors };
    if (!isValid && value) {
      newErrors[name] = errorMessage;
    } else {
      delete newErrors[name];
    }

    const isFormValid = formValidFunc
      ? formValidFunc(newInputs)
      : Object.values(newErrors).length === 0;

    return {
      ...prevState,
      isFormValid,
      inputs: newInputs,
      errors: newErrors,
    };
  });
};

export const getSubmitHandler = (category, tab) => (inputs, setFormState, submitMessage, submittingMessage) => {
  const [timer, setTimer] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => () => timer && clearTimeout(timer), []);

  return useCallback(() => {
    setFormState(prevState => ({
      ...prevState,
      isFormSending: true,
      submitMessage: submittingMessage,
    }));

    dispatch(SettingsActions.editSettings({ category, tab, inputs }));
    setTimer(setTimeout(
      () => setFormState && setFormState(prevState => ({
        ...prevState,
        isFormSending: false,
        submitMessage,
      })), SUBMIT_TIMEOUT));
  }, [dispatch]);
};

export const handlerWrapper = handlerFunc => e => {
  e.preventDefault();
  handlerFunc();
};
