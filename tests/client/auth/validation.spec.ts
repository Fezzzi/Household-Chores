import { assert } from 'chai';

import * as InputTypes from 'shared/constants/inputTypes';
import { isInputValid } from 'shared/helpers/validation';

const testData: any = {
  [InputTypes.TEXT]: {
    valid: [
      'aaaaaaa',
    ],
    invalid: [
      'aaa',
      'aaaaaaaaaaaaaaaaaaaaa',
    ],
  },
  [InputTypes.PASSWORD]: {
    valid: [
      'aaaaaaaa',
      'aaaaaAaaAAaAAaAaaAaaAaAaAAAAAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAaaaAAaaAAAAAAA',
    ],
    invalid: [
      'aaaaaaa',
      'aaaaaAaaAAaAAaAaaAaaAaAaAAAAAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAaaaAAaaAAAAAAAaaaAaaaAaaaAaaaAaaaAaaaaAaaaAAaaAAaaaAAaa',
    ],
  },
  [InputTypes.EMAIL]: {
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
};

const validateInputs = (inputKey: string, validityKey: string): boolean => {
  let validity = true;
  testData[inputKey][validityKey].forEach((input: string) => {
    validity = validity && isInputValid(inputKey, input);
  });
  return validity;
};

describe('Auth > validation', () => {
  describe('Shared input validation test', () => {
    it('should distinguish valid and invalid Email fields', () => {
      assert.isTrue(validateInputs(InputTypes.EMAIL, 'valid'));
      assert.isFalse(validateInputs(InputTypes.EMAIL, 'invalid'));
    });

    it('should distinguish valid and invalid Text fields', () => {
      assert.isTrue(validateInputs(InputTypes.TEXT, 'valid'));
      assert.isFalse(validateInputs(InputTypes.TEXT, 'invalid'));
    });

    it('should distinguish valid and invalid Password fields', () => {
      assert.isTrue(validateInputs(InputTypes.PASSWORD, 'valid'));
      assert.isFalse(validateInputs(InputTypes.PASSWORD, 'invalid'));
    });
  });
});
