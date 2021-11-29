function email (value, options = {}) {
  const isCorrectDomain = options.domain
    ? value.endsWith(options.domain)
    : true
  return isCorrectDomain && !!value.match(/@/)
}

export { email }
