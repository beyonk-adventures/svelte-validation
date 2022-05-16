import { get } from 'svelte/store'
import { expect } from '@hapi/code'
import { schema } from './schema.js'

describe('schema', () => {
  describe('#schema()', () => {
    let built

    beforeEach(() => {
      built = schema({})
    })

    it('builds a graph of fields', () => {
      expect(
        Object.keys(built)
      ).to.only.once.include([ 'form', 'validation' ])
    })
  })

  describe('#schema()', () => {
    let validation
    let form

    beforeEach(() => {
      const built = schema({
        foo: {
          value: null,
          validators: []
        },
        bar: {
          value: 'bar',
          validators: [
            { validator: v => v.startsWith('valid'), message: 'is not valid' },
            { validator: v => v.endsWith('value'), message: 'is not the right value' }
          ]
        }
      })
      validation = get(built.validation)
      form = get(built.form)
    })

    it('builds a graph of fields', () => {
      expect(
        Object.keys(validation)
      ).to.only.once.include([ 'foo', 'bar', '_form' ])
    })

    it('initial form state', () => {
      expect(
        validation._form
      ).to.equal({
        valid: false,
        invalid: false,
        dirty: false
      })
    })

    it('initial field config', () => {
      expect(
        form.foo.value
      ).to.equal(null)
    })

    it('initial validator config', () => {
      expect(
        form.foo.validate
      ).to.be.a.function()
    })

    it('initial field valdiation', () => {
      expect(
        validation.foo
      ).to.equal({
        valid: false,
        invalid: false,
        dirty: false,
        message: undefined
      })
    })
  })

  describe('#schema()', () => {
    let form

    beforeEach(() => {
      const built = schema({
        bar: {
          value: 'bar',
          validators: [
            { validator: 'required', message: 'is required' },
            { validator: v => true, message: 'not valid' }
          ]
        }
      })
      form = get(built.form)
    })

    it('initial validator setup', () => {
      expect(
        form.bar.validate('qux')
      ).to.be.true()
    })

    it('initial validator setup', () => {
      const err = expect(() => {
        form.bar.validate(undefined)
      }).to.throw()
      expect(err).to.be.an.error()
      expect(err.message).to.equal('is required')
    })
  })
})
