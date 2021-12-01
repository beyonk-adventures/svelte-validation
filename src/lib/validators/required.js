function requiredValidator () {
  return function (value) {
    return !!value || {}
  }
}

export { requiredValidator as required }
