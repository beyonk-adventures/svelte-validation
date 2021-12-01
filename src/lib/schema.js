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
              ? validatorFunctions[validator](options)
              : validator
          const result = validate(value)
          if (result !== true) {
            let msg = message

            for (const [ prop, val ] of Object.entries(result)) {
              msg = msg.replace(`%${prop}%`, val)
            }

            throw new Error(msg)
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
