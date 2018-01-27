const _ = require('lodash')
const Promise = require('bluebird')

const Reducer = require('../reducer-types')
const AccumulatorFactory = require('../accumulator/factory')
const { stringifyReducerStack } = require('../reducer-stack')

/**
 * @param {Object} spec
 * @return {Object}
 */
function getOptions (spec) {
  return _.defaults({}, spec, {
    locals: {}
  })
}

/**
 * @param {Object} manager
 * @param {*} reducerSource
 * @param {*} value
 * @param {Object} options
 * @return {Promise}
 */
function reducerResolve (manager, reducerSource, value, options) {
  const contextOptions = getOptions(options)
  const accumulator = AccumulatorFactory.create({
    value: value,
    locals: contextOptions.locals,
    trace: contextOptions.trace,
    values: manager.values.getStore()
  })

  const reducer = Reducer.create(reducerSource)
  const stack = contextOptions.debug ? [] : null

  return Reducer.resolve(manager, accumulator, reducer, stack)
}

/**
 * @param {Object} options
 * @param {Error} error
 * @throws
 */
function onError (options, error) {
  if (error.rstack && !_.get(options, ['debug', 'silent'])) {
    const header = error.rvalue.header
    error.rstack = stringifyReducerStack(error.rstack)
    let message = `The following reducer failed to execute:\n${
      error.rstack
    }\n\n${header}:\n${JSON.stringify(error.rvalue.value, null, 2)}`

    // reducers can add more information with the _message property
    if (error._message) {
      message += `\n\n${error._message}`
    }

    console.error(message)
  }

  throw error
}

/**
 * @param {Object} manager
 * @param {*} reducerSource
 * @param {*} value
 * @param {Object} options
 * @param {Function} done
 * @return {Promise}
 */
function transform (manager, reducerSource, value, options, done) {
  return Promise.resolve()
    .then(() => reducerResolve(manager, reducerSource, value, options))
    .catch(error => onError(options, error))
    .asCallback(done)
}

module.exports.transform = transform

/**
 * @param {Object} manager
 * @param {*} reducerSource
 * @param {*} value
 * @param {Object} options
 * @return {Promise}
 */
function resolve (manager, reducerSource, value, options) {
  return Promise.resolve()
    .then(() => reducerResolve(manager, reducerSource, value, options))
    .then(acc => acc.value)
    .catch(error => onError(options, error))
}

module.exports.resolve = _.curry(resolve, 3)
