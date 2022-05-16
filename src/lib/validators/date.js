import { finalise } from './utils.js'

function dateValidator ({
  before,
  after
} = {}) {
  return function (value) {
    const date = new Date(value)
    let valid = true

    if (before) {
      valid = valid && date > new Date(finalise(before))
    }

    if (after) {
      valid = valid && date < finalise(after)
    }

    return valid
  }
}

export { dateValidator as date }
