function emailValidator (options = {}) {
  return function (value) {
    const isCorrectDomain = options.domain
      ? value.endsWith(options.domain)
      : true
    return isCorrectDomain && !!value.match(/@/) ? true : { email: value }
  }
}

export { emailValidator as email }
