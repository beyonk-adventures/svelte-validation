function requiredValidator () {
  return function (value) {
    console.log('check value', value)
    return !!value || {}
  }
}

export { requiredValidator as required }
