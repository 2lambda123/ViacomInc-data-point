const assert = require('assert')

const DataPoint = require('../')

const { Model, Request } = DataPoint.entities

const PersonRequest = Request('PersonRequest', {
  url: 'https://swapi.co/api/people/{value}'
})

const PersonModel = Model('PersonModel', {
  value: {
    name: '$name',
    birthYear: '$birth_year'
  }
})

const dataPoint = DataPoint.create()

dataPoint.resolve([PersonRequest, PersonModel], 1).then(output => {
  assert.deepEqual(output, {
    name: 'Luke Skywalker',
    birthYear: '19BBY'
  })
})
