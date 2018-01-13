const Promise = require('bluebird')

const utils = require('../../utils')
const { onReducerError } = require('../reducer-stack')

/**
 * @param {Object} manager
 * @param {Function} resolveReducer
 * @param {Accumulator} accumulator
 * @param {ReducerObject} reducer
 * @param {Array} stack
 * @returns {Promise<Accumulator>}
 */
function resolve (manager, resolveReducer, accumulator, reducer, stack) {
  const _stack =
    stack && reducer.body.name ? [...stack, [reducer.body.name]] : stack

  return Promise.try(() => reducer.body(accumulator))
    .then(value => utils.set(accumulator, 'value', value))
    .catch(error => onReducerError(_stack, accumulator.value, error))
}

module.exports.resolve = resolve
