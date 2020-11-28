import { assert } from 'chai'

import { INPUT_TYPE } from 'shared/constants'
import { isInputValid } from 'shared/helpers/validation'

const testData: any = {
  [INPUT_TYPE.TEXT]: {
    valid: [
      'aaaaaaa',
    ],
    invalid: [
      'aaa',
      'aaaaaaaaaaaaaaaaaaaaa',
    ],
  },
  [INPUT_TYPE.PASSWORD]: {
    valid: [
      'aaaaaaaa',
      'aaaaaAaaAAaAAaAaaAaaAaAaAAAAAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAaaaAAaaAAAAAAA',
    ],
    invalid: [
      'aaaaaaa',
      'aaaaaAaaAAaAAaAaaAaaAaAaAAAAAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAaaaAAaaAAAAAAAaaaAaaaAaaaAaaaAaaaAaaaaAaaaAAaaAAaaaAAaa',
    ],
  },
  [INPUT_TYPE.EMAIL]: {
    valid: [
      'test@domain.com',
      'id-with-dash@domain.com',
      'test.email.with+symbol@domain.com',
      'a@domain.com',
      'a@a.a',
    ],
    invalid: [
      'example.com',
      'A@b@c@domain.com',
      'tet@domain.com',
      '@domain.com',
      'test@.com',
    ],
  },
}

const validateInputs = (inputKey: string, validityKey: string): boolean => {
  let validity = true
  testData[inputKey][validityKey].forEach((input: string) => {
    validity = validity && isInputValid(inputKey, input).valid
  })
  return validity
}

describe('Auth > validation', () => {
  describe('Shared input validation test', () => {
    it('should distinguish valid and invalid Email fields', () => {
      assert.isTrue(validateInputs(INPUT_TYPE.EMAIL, 'valid'))
      assert.isFalse(validateInputs(INPUT_TYPE.EMAIL, 'invalid'))
    })

    it('should distinguish valid and invalid Text fields', () => {
      assert.isTrue(validateInputs(INPUT_TYPE.TEXT, 'valid'))
      assert.isFalse(validateInputs(INPUT_TYPE.TEXT, 'invalid'))
    })

    it('should distinguish valid and invalid Password fields', () => {
      assert.isTrue(validateInputs(INPUT_TYPE.PASSWORD, 'valid'))
      assert.isFalse(validateInputs(INPUT_TYPE.PASSWORD, 'invalid'))
    })
  })
})
