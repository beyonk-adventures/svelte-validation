function validator (node, { form: initial, validation }) {
  const key = node.dataset.key
  let previous = initial[key].value

  return {
    update ({ form }) {
      const current = form[key].value

      if (previous === current) {
        return
      }

      let formValid = true
      const fields = {}

      validation.update(validated => {
        delete validated._form
        for (const [ field, result ] of Object.entries(validated)) {
          let valid = result.valid
          let invalid = result.invalid
          let dirty = result.dirty
          let message = result.message

          if (field === key) {
            dirty = true
            try {
              valid = form[field].validate(current)
              message = undefined
              node.classList.remove('invalid')
              node.dispatchEvent(new CustomEvent('valid'))
            } catch (e) {
              valid = false
              message = e.message
              node.classList.add('invalid')
            } finally {
              previous = current
              invalid = dirty && !valid
            }
          }

          formValid = formValid && valid

          fields[field] = {
            dirty,
            message,
            valid,
            invalid
          }
        }

        return {
          ...fields,
          _form: {
            valid: formValid,
            invalid: !formValid,
            dirty: true
          }
        }
      })
    }
  }
}

export { validator }
