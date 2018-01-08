const Promise = require('bluebird')
const utils = require('../../../utils')

/**
 * @param {Object} manager
 * @param {Function} createReducer
 * @param {Accumulator} accumulator
 * @param {ReducerMap} reducerMap
 * @returns {Promise<Accumulator>}
 */
function resolve (manager, createReducer, accumulator, reducerMap) {
  const reducer = reducerMap.reducer
  if (utils.reducerIsEmpty(reducer)) {
    return Promise.resolve(accumulator)
  }

  return Promise.map(accumulator.value, itemValue => {
    const itemContext = utils.set(accumulator, 'value', itemValue)
    return createReducer(manager, itemContext, reducer).then(res => {
      return res.value
    })
  }).then(result => utils.set(accumulator, 'value', result))
}

module.exports.resolve = resolve