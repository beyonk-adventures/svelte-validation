import { stub } from 'sinon'
import { expect } from '@hapi/code'
import { validator } from './action.js'
import { writable, get } from 'svelte/store'

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

describe('action', () => {
  beforeEach(() => {
    global.CustomEvent = class {
      constructor (eventName) {
        this.eventName = eventName
      }
    }
  })

  afterEach(() => {
    delete global.CustomEvent
  })

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
        validation = {
          update: stub()
        }
        action = validator(node, { form, validation })
        action.update({ form })
      })

      it('noop', () => {
        expect(
          validation.update.callCount
        ).to.equal(0)
      })
    })

    context('initial state, untouched', () => {
      let action
      let node
      let validation

      const form = {
        foo: {
          value: 'f',
          validate: () => true
        }
      }

      const storeState = {
        foo: {
          valid: false,
          invalid: false,
          dirty: false
        },
        _form: {
          valid: false,
          invalid: false,
          dirty: false,
          message: undefined
        }
      }

      beforeEach(() => {
        node = stubNode('foo')
        validation = writable(storeState)
        action = validator(node, { form, validation })
        action.update({ form })
      })

      it('has untouched state', () => {
        expect(
          get(validation)
        ).to.equal({
          foo: {
            valid: false,
            invalid: false,
            dirty: false
          },
          _form: {
            valid: false,
            invalid: false,
            message: undefined,
            dirty: false
          }
        })
      })
    })

    context('field is updated, all fields valid', () => {
      let action
      let node
      let validation

      const storeState = {
        foo: {
          valid: false,
          invalid: false,
          dirty: false
        },
        _form: {
          valid: false,
          invalid: false,
          dirty: false,
          message: undefined
        }
      }

      beforeEach(() => {
        const form = {
          foo: {
            value: 'f',
            validate: () => true
          }
        }
        node = stubNode('foo')
        validation = writable(storeState)
        action = validator(node, { form, validation })
        form.foo.value = 'g'
        action.update({ form })
      })

      it('calls update with correct values', () => {
        expect(
          get(validation)
        ).to.equal({
          foo: {
            valid: true,
            invalid: false,
            dirty: true,
            message: undefined
          },
          _form: {
            valid: true,
            invalid: false,
            dirty: true
          }
        })
      })

      it('triggers custom event', () => {
        expect(
          node.dispatchEvent.firstCall.args[0]
        ).to.equal(
          new CustomEvent('valid')
        )
      })

      it('removes invalid class', () => {
        expect(
          node.classList.remove.callCount
        ).to.equal(1)
      })
    })

    context('field is updated, all fields valid', () => {
      let action
      let node
      let validation

      const storeState = {
        foo: {
          valid: false,
          invalid: false,
          dirty: false
        },
        _form: {
          valid: false,
          invalid: false,
          dirty: false,
          message: undefined
        }
      }

      beforeEach(() => {
        const form = {
          foo: {
            value: 'f',
            validate: () => true
          }
        }

        node = stubNode('foo')
        validation = writable(storeState)
        action = validator(node, { form, validation })
        form.foo.value = 'g'
        action.update({ form })
      })

      it('calls update with correct values', () => {
        expect(
          get(validation)
        ).to.equal({
          foo: {
            valid: true,
            invalid: false,
            dirty: true,
            message: undefined
          },
          _form: {
            valid: true,
            invalid: false,
            dirty: true
          }
        })
      })

      it('triggers custom event', () => {
        expect(
          node.dispatchEvent.firstCall.args[0]
        ).to.equal(
          new CustomEvent('valid')
        )
      })

      it('removes invalid class', () => {
        expect(
          node.classList.remove.callCount
        ).to.equal(1)
      })
    })

    context('one field becomes valid', () => {
      let action
      let node
      let validation

      const storeState = {
        foo: {
          valid: false,
          invalid: false,
          dirty: false
        },
        _form: {
          valid: false,
          invalid: false,
          dirty: false,
          message: undefined
        }
      }

      beforeEach(() => {
        const form = {
          foo: {
            value: 'f',
            validate: () => true
          }
        }
        node = stubNode('foo')
        validation = writable(storeState)
        action = validator(node, { form, validation })
        form.foo.value = 'g'
        action.update({ form })
      })

      it('calls update with correct values', () => {
        expect(
          get(validation)
        ).to.equal({
          foo: {
            valid: true,
            invalid: false,
            dirty: true,
            message: undefined
          },
          _form: {
            valid: true,
            invalid: false,
            dirty: true
          }
        })
      })

      it('triggers custom event', () => {
        expect(
          node.dispatchEvent.firstCall.args[0]
        ).to.equal(
          new CustomEvent('valid')
        )
      })

      it('removes invalid class', () => {
        expect(
          node.classList.remove.callCount
        ).to.equal(1)
      })
    })

    context('one field becomes invalid', () => {
      let action
      let node
      let validation

      const storeState = {
        foo: {
          valid: false,
          invalid: false,
          dirty: false
        },
        bar: {
          valid: false,
          invalid: false,
          dirty: false
        },
        _form: {
          valid: false,
          invalid: false,
          dirty: false,
          message: undefined
        }
      }

      beforeEach(() => {
        const form = {
          foo: {
            value: 'f',
            validate: () => true
          },
          bar: {
            value: 'b',
            validate: () => { throw new Error('Field invalid') }
          }
        }
        node = stubNode('bar')
        validation = writable(storeState)
        action = validator(node, { form, validation })
        form.bar.value = 'c'
        action.update({ form })
      })

      it('calls update with correct values', () => {
        expect(
          get(validation)
        ).to.equal({
          foo: {
            valid: false,
            invalid: false,
            dirty: false,
            message: undefined
          },
          bar: {
            valid: false,
            invalid: true,
            dirty: true,
            message: 'Field invalid'
          },
          _form: {
            valid: false,
            invalid: true,
            dirty: true
          }
        })
      })

      it('adds invalid class', () => {
        expect(
          node.classList.add.firstCall.args[0]
        ).to.equal('invalid')
      })
    })

    context('initially invalid field becomes valid', () => {
      let action
      let node
      let validation

      const storeState = {
        foo: {
          valid: false,
          invalid: false,
          dirty: false,
          message: undefined
        },
        bar: {
          valid: false,
          invalid: false,
          dirty: false,
          message: undefined
        },
        _form: {
          valid: false,
          invalid: false,
          dirty: false
        }
      }

      beforeEach(() => {
        const form = {
          foo: {
            value: 'f',
            validate: () => true
          },
          bar: {
            value: 'b',
            validate: () => true
          }
        }

        node = stubNode('foo')
        validation = writable(storeState)
        action = validator(node, { form, validation })
        form.foo.value = 'c'
        action.update({ form })
      })

      it('calls update with correct values', () => {
        expect(
          get(validation)
        ).to.equal({
          foo: {
            valid: true,
            invalid: false,
            dirty: true,
            message: undefined
          },
          bar: {
            valid: false,
            invalid: false,
            dirty: false,
            message: undefined
          },
          _form: {
            valid: false,
            invalid: true,
            dirty: true
          }
        })
      })

      it('triggers custom event', () => {
        expect(
          node.dispatchEvent.firstCall.args[0]
        ).to.equal(
          new CustomEvent('valid')
        )
      })

      it('removes invalid class', () => {
        expect(
          node.classList.remove.callCount
        ).to.equal(1)
      })
    })
  })
})
