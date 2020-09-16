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

export const handlerWrapper = handlerFunc => e => {
  e.preventDefault();
  handlerFunc();
};
