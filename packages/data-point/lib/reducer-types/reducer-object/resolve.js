const Promise = require('bluebird')
const set = require('lodash/set')

const utils = require('../../utils')

/**
 * @param {Object} manager
 * @param {Function} resolveReducer
 * @param {Accumulator} accumulator
 * @param {ReducerObject} reducer
 * @param {Array} stack
 * @returns {Promise<Accumulator>}
 */
function resolve (manager, resolveReducer, accumulator, reducer, stack) {
  if (reducer.props.length === 0) {
    return Promise.resolve(accumulator)
  }

  const props = Promise.map(reducer.props, ({ path, reducer }) => {
    const _stack = stack ? [...stack, path] : stack
    return resolveReducer(manager, accumulator, reducer, _stack).then(
      ({ value }) => ({
        path,
        value
      })
    )
  })

  return props
    .reduce((acc, { path, value }) => set(acc, path, value), {})
    .then(value => utils.set(accumulator, 'value', value))
}

module.exports.resolve = resolve
