const dataPoint = require('../').create()
const assert = require('assert')

dataPoint.addEntities({
  'hash:pickKeys': {
    pickKeys: ['url']
  }
})

// notice how name is no longer in the object
const expectedResult = {
  url: 'https://github.com/ViacomInc/data-point'
}

const input = {
  name: 'DataPoint',
  url: 'https://github.com/ViacomInc/data-point'
}

dataPoint.transform('hash:pickKeys', input).then(acc => {
  assert.deepEqual(acc.value, expectedResult)
  console.log(acc.value)
})
