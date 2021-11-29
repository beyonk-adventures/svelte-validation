import { writable } from 'svelte/store';
import * as validatorFunctions from './validators';

function schema(configuration) {
  const store = {};
  const out = {
    _form: {
      invalid: false,
    },
  };

  for (const [key, { value, validators }] of Object.entries(configuration)) {
    store[key] = {
      value,
      validate: function (value) {
        for (const { validator, message, options } of validators) {
          const validate =
            typeof validator === 'string'
              ? validatorFunctions[validator]
              : validator;
          if (!validate(value, options)) {
            throw new Error(message.replace('%s', value));
          }
        }
        return true;
      },
    };

    out[key] = {
      invalid: false,
      dirty: false,
      message: null,
    };
  }

  return {
    form: writable(store),
    validation: writable(out),
  };
}

export { schema };
