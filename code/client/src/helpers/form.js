import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { SettingsActions } from 'clientSrc/actions'
import { SUBMIT_TIMEOUT } from 'clientSrc/constants'
import { FORM } from 'shared/constants/localeMessages'

// todo: Refactor Login, Signup and Reset forms to use useUpdateHandler instead
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
    }

    const isFormValid = formValidFunc(inputs)
    const errors = {
      ...prevState.errors,
      [input]: isValid || !value ? '' : errorMessage,
    }

    return {
      ...prevState,
      isFormValid,
      isFormChanged: formChangedFunc(inputs),
      inputs,
      errors,
    }
  })
}

export const useFormState = data => {
  const [state, setState] = useState({
    submitMessage: FORM.SAVE,
    isFormValid: true,
    isFormSending: false,
    inputs: {},
    errors: {},
  })

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      isFormValid: true,
      inputs: {},
      errors: {},
    }))
  }, [data])

  return {
    ...state,
    setFormState: setState,
  }
}

export const useUpdateHandler = (name, setFormState, formValidFunc, placeholder) => (isValid, value, errorMessage) => {
  setFormState(prevState => {
    const newInputs = { ...prevState.inputs }
    if (value !== '' && (placeholder === undefined || value !== placeholder)) {
      newInputs[name] = value
    } else {
      delete newInputs[name]
    }

    const newErrors = { ...prevState.errors }
    if (!isValid && value) {
      newErrors[name] = errorMessage
    } else {
      delete newErrors[name]
    }

    const isFormValid = formValidFunc
      ? formValidFunc(newInputs)
      : Object.values(newErrors).length === 0

    return {
      ...prevState,
      isFormValid,
      inputs: newInputs,
      errors: newErrors,
    }
  })
}

export const useSubmitHandler = (category, tab) => {
  const [timer, setTimer] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => () => timer && clearTimeout(timer), [])

  return useCallback((inputs, setFormState, submitMessage = FORM.SAVE, submittingMessage = FORM.SAVING) => {
    setFormState(prevState => ({
      ...prevState,
      isFormSending: true,
      submitMessage: submittingMessage,
    }))

    dispatch(SettingsActions.editSettings({ category, tab, inputs }))
    setTimer(setTimeout(
      () => setFormState && setFormState(prevState => ({
        ...prevState,
        isFormSending: false,
        submitMessage,
      })), SUBMIT_TIMEOUT))
  }, [category, tab, dispatch])
}

// todo: Remove when removing updateInput
export const handlerWrapper = handlerFunc => e => {
  e.preventDefault()
  handlerFunc()
}
