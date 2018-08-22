/* eslint-env jest */

const TimeHelpers = require('./time-helpers')

const mockedTime = [1, TimeHelpers.NS_PER_SEC * 1]

describe('nanoToMillisecond', () => {
  it('should convert to milliseconds', () => {
    expect(TimeHelpers.nanoToMillisecond(1000000)).toEqual(1)
  })
})

describe('hrtimeTotNanosec', () => {
  it('should convert hrtime resolution to nanosec', () => {
    expect(TimeHelpers.hrtimeTotNanosec(mockedTime)).toEqual(2000000000)
  })
})

describe('getDuration', () => {
  let mockhrTime
  afterAll(() => {
    mockhrTime.mockRestore()
  })
  it('should return difference between two times', () => {
    mockhrTime = jest.spyOn(process, 'hrtime').mockImplementation(t => {
      return mockedTime
    })
    expect(TimeHelpers.getDuration()).toEqual(2000000000)
    expect(mockhrTime).toBeCalled()
  })
})
