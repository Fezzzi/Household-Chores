export const updateInput = (
  setState,
  input,
  formValidFunc = inputs => Object.values(inputs).every(i => i.valid),
  formChangedFunc = inputs => Object.values(inputs).find(i => i.value),
) => (isValid, value) => {
  setState(prevState => {
    const inputs = {
      ...prevState.inputs,
      [input]: {
        valid: isValid,
        value,
      },
    };

    return {
      ...prevState,
      isFormValid: formValidFunc(inputs),
      isFormChanged: formChangedFunc(inputs),
      inputs,
    };
  });
};

export const handlerWrapper = handlerFunc => e => {
  e.preventDefault();
  handlerFunc();
};
