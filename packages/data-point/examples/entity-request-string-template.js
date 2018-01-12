const dataPoint = require('../').create()
const assert = require('assert')
const mockRequest = require('./entity-request-basic.mock')

dataPoint.addEntities({
  'request:getLuke': {
    url: 'https://swapi.co/api/people/{value.personId}/'
  }
})

// mock the remote service
mockRequest()

const input = {
  personId: 1
}

dataPoint.transform('request:getLuke', input).then(acc => {
  const result = acc.value
  assert.equal(result.name, 'Luke Skywalker')
  assert.equal(result.height, '172')
  console.dir(acc.value, { colors: true })
})
