const deepFreeze = require('deep-freeze')
const defaultTo = require('lodash/defaultTo')

const createTransform = require('../../transform-expression').create

/**
 * @param {function} Factory - factory function to create the entity
 * @param {Object} spec - spec for the Entity
 * @param {string} id - Entity's id
 */
function create (Factory, spec, id) {
  const entity = new Factory(spec)

  entity.id = id

  if (spec.before) {
    entity.before = createTransform(spec.before)
  }

  entity.value = createTransform(spec.value)

  if (spec.after) {
    entity.after = createTransform(spec.after)
  }

  if (spec.error) {
    entity.error = createTransform(spec.error)
  }

  entity.params = deepFreeze(defaultTo(spec.params, {}))

  return entity
}

module.exports.create = create
