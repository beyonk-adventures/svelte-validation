import { writable } from 'svelte/store'
import * as validatorFunctions from './validators/index.js'

function schema (configuration) {
  const store = {}
  const out = {
    _form: {
      valid: true,
      invalid: false
    }
  }

  for (const [ key, { value, validators } ] of Object.entries(configuration)) {
    store[key] = {
      value,
      validate: function (value) {
        for (const { validator, message, options } of validators) {
          const validate =
            typeof validator === 'string'
              ? validatorFunctions[validator]
              : validator
          if (!validate(value, options)) {
            throw new Error(message.replace('%s', value))
          }
        }
        return true
      }
    }

    out[key] = {
      invalid: false,
      valid: false,
      dirty: false,
      message: undefined
    }

    out._form = {
      invalid: false,
      valid: false,
      dirty: false
    }
  }

  return {
    form: writable(store),
    validation: writable(out)
  }
}

export { schema }
