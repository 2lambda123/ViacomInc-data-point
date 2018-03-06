/* eslint-env jest */

const { createEntityFactory } = require('./factory')

describe('creating a model with createEntityFactory', () => {
  const factory = createEntityFactory('model')
  const spec = { value: input => input }
  const instance = factory('nuts', spec)

  test('createEntityFactory return value should be a function', () => {
    expect(createEntityFactory).toBeInstanceOf(Function)
  })

  test('createEntityFactory return value should have the correct "type" property', () => {
    expect(factory.type).toBe('model')
  })

  test('entity factory should return an object with the expected shape', () => {
    // the 'model:nuts' key should appear in this snapshot,
    // but other keys shouldn't because they're non-enumerable
    expect(instance).toMatchSnapshot()
  })

  test('model should have the correct "id" property', () => {
    expect(instance.id).toBe('model:nuts')
  })

  test('model should have the correct "type" property', () => {
    expect(instance.type).toBe('model')
  })

  test('model should have the correct "name" property', () => {
    expect(instance.name).toBe('nuts')
  })

  test('model should have the correct "spec" property', () => {
    expect(instance.spec).toEqual(spec)
  })
})
