function finalise (condition) {
    return typeof condition === 'function' ? condition() : condition
}

export {
    finalise
}