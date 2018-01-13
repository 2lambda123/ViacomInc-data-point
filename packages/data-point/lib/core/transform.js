const _ = require('lodash')
const Promise = require('bluebird')

const Reducer = require('../reducer-types')
const AccumulatorFactory = require('../accumulator/factory')
const { stringifyReducerStack } = require('../reducer-types/reducer-stack')

function getOptions (spec) {
  return _.defaults({}, spec, {
    locals: {}
  })
}

function resolve (manager, reducerSource, value, options) {
  const contextOptions = getOptions(options)
  const context = AccumulatorFactory.create({
    value: value,
    locals: contextOptions.locals,
    trace: contextOptions.trace,
    values: manager.values.getStore()
  })

  const reducer = Reducer.create(reducerSource)
  const stack = contextOptions.debug ? [] : false
  return Reducer.resolve(manager, context, reducer, stack)
}

function transform (manager, reducerSource, value, options, done) {
  return Promise.resolve()
    .then(() => resolve(manager, reducerSource, value, options))
    .catch(error => {
      if (error.rstack) {
        console.error(
          `The following reducer failed to execute:\n ${stringifyReducerStack(
            error.rstack
          )}`
        )
      }
      throw error
    })
    .asCallback(done)
}

module.exports = transform
