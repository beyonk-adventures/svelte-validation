import { finalise } from './utils.js'

function includesValidator ({ list = [] }) {
  return function (value) {
    const comparison = finalise(list)
    const values = Array.isArray(value) ? value : [ value ]

    for (const v of values) {
      if (!comparison.includes(v)) {
        return { list: comparison }
      }
    }

    return true
  }
}

export { includesValidator as includes }
