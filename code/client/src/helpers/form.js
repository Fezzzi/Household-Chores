import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { SUBMIT_TIMEOUT } from 'clientSrc/constants'
import { FORM } from 'shared/constants/localeMessages'

/**
 * Returns generally usable form state that uses data array as dependencies for state resetting effect
 *
 * @param data Dependency array
 * @param submitMessage
 * @param isFormValid
 */
export const useFormState = (data, submitMessage = FORM.SAVE, isFormValid = true) => {
  const [state, setState] = useState({
    submitMessage,
    isFormValid,
    isFormSending: false,
    inputs: {},
    errors: {},
  })

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      isFormValid,
      inputs: {},
      errors: {},
    }))
  }, data)

  return {
    ...state,
    setFormState: setState,
  }
}

const isShallowEqual = (arrA, arrB) =>
  Array.isArray(arrA) && Array.isArray(arrB) && arrA.every(a => arrB.includes(a)) && arrB?.every(b => arrA.includes(b))

/**
 * Returns update handler for single input
 *
 * @param setFormState
 * @param formValidFunc
 * @returns function
 */
export const useUpdateHandler = (setFormState, formValidFunc) =>
  (name, isValid, value, errorMessage, defaultValue = null) => {
    setFormState(prevState => {
      const newInputs = { ...prevState.inputs }
      if (value !== '' && (defaultValue === null || (value !== defaultValue && !isShallowEqual(value, defaultValue)))) {
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
        ? formValidFunc(newInputs, newErrors)
        : Object.values(newErrors).length === 0

      return {
        ...prevState,
        isFormValid,
        inputs: newInputs,
        errors: newErrors,
      }
    })
  }

/**
 * Generally usable form submit handler dispatching provided action with payload = { ...payload, inputs }
 *
 * @param action
 * @param payload
 * @returns function
 */
export const useSubmitHandler = (action, payload) => {
  const [timer, setTimer] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => () => timer && clearTimeout(timer), [])

  return useCallback((inputs, setFormState, submitMessage = FORM.SAVE, submittingMessage = FORM.SAVING) => {
    setFormState(prevState => ({
      ...prevState,
      isFormSending: true,
      submitMessage: submittingMessage,
    }))

    dispatch(action({ ...payload, inputs }))
    setTimer(setTimeout(
      () => setFormState && setFormState(prevState => ({
        ...prevState,
        isFormSending: false,
        submitMessage,
      })), SUBMIT_TIMEOUT))
  }, [dispatch, payload])
}

/**
 * Form validity checking function failing until all required input keys are filled with valid values
 *
 * @param requiredKeys
 * @returns function
 */
export const useFormValidOnFilled = requiredKeys => (inputs, errors) => {
  const filledInputs = Object.keys(inputs)
  return filledInputs.length === requiredKeys.length
    && filledInputs.every(input => requiredKeys.indexOf(input) !== -1)
    && Object.values(errors).length === 0
}
