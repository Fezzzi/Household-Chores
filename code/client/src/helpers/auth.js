export const updateInput = (ctx, input) => (isValid, value) => {
  ctx.setState(prevState => {
    const inputs = {
      ...prevState.inputs,
      [input]: {
        valid: isValid,
        value,
      },
    };

    return {
      isFormValid: Object.values(inputs).every(i => i.valid),
      inputs,
    };
  });
};

export const handlerWrapper = handlerFunc => e => {
  e.preventDefault();
  handlerFunc();
};