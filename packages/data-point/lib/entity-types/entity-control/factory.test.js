/* eslint-env jest */
'use strict'

const factory = require('./factory')

test('factory#create', () => {
  const control = factory.create({
    select: [
      { case: '$a', do: '$b' },
      { case: '$c', do: '$d' },
      { default: '$e' }
    ]
  })

  expect(control).toHaveProperty('before')
  expect(control).toHaveProperty('after')
  expect(control).toHaveProperty('error')
  expect(control).toHaveProperty('params')
  expect(control).toHaveProperty('select')
})

test('factory#create enforce default statement', () => {
  expect(() => {
    factory.create({
      select: [{ case: 'a()', do: 'b()' }, { case: 'c()', do: 'd()' }]
    })
  }).toThrow(/missing|default/)
})
