import { stub } from 'sinon'
import { expect } from '@hapi/code'
import { validator } from './action.js'

function stubNode (key) {
  return {
    dataset: {
      key
    },
    dispatchEvent: stub(),
    classList: {
      add: stub(),
      remove: stub()
    }
  }
}

function stubStore () {
  return {
    update: stub()
  }
}

describe('action', () => {
  describe('#validator()', () => {
    context('initial state / no changes', () => {
      let action
      let node
      let validation

      const form = {
        foo: { value: undefined }
      }

      beforeEach(() => {
        node = stubNode('foo')
        validation = stubStore()
        action = validator(node, { validation })
        action.update({ form })
      })

      it('noop', () => {
        expect(
          validation.update.callCount
        ).to.equal(0)
      })
    })
  })
})
