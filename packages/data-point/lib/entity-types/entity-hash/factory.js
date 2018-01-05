'use strict'

const _ = require('lodash')
const createReducer = require('../../reducer-types').create
const createReducerObject = require('../../reducer-types/reducer-object').create
const deepFreeze = require('deep-freeze')
const parseCompose = require('../parse-compose')
const createBaseEntity = require('../base-entity').create

/**
 * @class
 */
function EntityHash () {}

module.exports.EntityHash = EntityHash

const modifierKeys = ['omitKeys', 'pickKeys', 'mapKeys', 'addValues', 'addKeys']

function createCompose (composeParse) {
  return composeParse.map(modifier => {
    let spec
    let reducer
    switch (modifier.type) {
      case 'addValues':
        spec = _.defaultTo(modifier.spec, {})
        reducer = deepFreeze(spec)
        break
      case 'omitKeys':
      case 'pickKeys':
        spec = _.defaultTo(modifier.spec, [])
        reducer = Object.freeze(spec.slice(0))
        break
      case 'mapKeys':
      case 'addKeys':
        reducer = createReducerObject(createReducer, modifier.spec)
    }

    return Object.assign({}, modifier, {
      reducer
    })
  })
}

/**
 * Creates new Entity Object
 * @param  {Object} spec - spec
 * @param {string} id - Entity id
 * @return {EntityHash} Entity Object
 */
function create (spec, id) {
  parseCompose.validateComposeModifiers(spec, modifierKeys)

  const entity = createBaseEntity(EntityHash, spec, id)

  const compose = parseCompose.parse(spec, modifierKeys)
  parseCompose.validateCompose(entity.id, compose, modifierKeys)
  entity.compose = createCompose(compose)

  return Object.freeze(entity)
}

module.exports.create = create
