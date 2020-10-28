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

export const handlerWrapper = handlerFunc => e => {
  e.preventDefault();
  handlerFunc();
};
