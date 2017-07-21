import actions from './actions'

describe('actions', () => {
  const types = [
    'ADD_SPICES',
    'REMOVE',
    'BOUNCE',
    'SHUFFLE',
  ]

  it('is a function', () => {
    expect(typeof actions).toBe('function')
  })

  it('returns an object with types', () => {
    const result = actions('theprefix', types)
    expect(Object.keys(result).filter(key => (
      typeof result[key] === 'string'
    )).length).toBe(types.length * 3)
  })

  it('returns an object with actions with the default meta', () => {
    const result = actions('theprefix', types)
    expect(Object.keys(result).filter(key => (
      typeof result[key] === 'function'
    )).length).toBe(types.length)
    expect(result.addSpices('payload')).toEqual({
      type: 'theprefix/ADD_SPICES',
      payload: 'payload',
      meta: {
        successType: 'theprefix/ADD_SPICES_SUCCESS',
        failureType: 'theprefix/ADD_SPICES_FAILURE',
      },
    })
  })
})
