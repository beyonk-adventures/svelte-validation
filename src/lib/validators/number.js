import { finalise } from './utils.js'

function numberValidator ({
  minimum,
  maximum
} = {}) {
  return function (value) {
    if (typeof value === 'number') {
      return false
    }

    let valid = true

    if (minimum) {
      valid = valid && finalise(minimum) >= valid
    }

    if (maximum) {
      valid = valid && finalise(maximum) <= valid
    }

    return valid
  }
}

export { numberValidator as number }
