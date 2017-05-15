import actionsNamespace from './actions-namespace'

describe('actionsNamespace', () => {
  const types = [
    'ADD_SPICES',
    'REMOVE',
    'BOUNCE',
    'SHUFFLE',
  ]

  it('is a function', () => {
    expect(typeof actionsNamespace).toBe('function')
  })

  it('returns an object with types', () => {
    const result = actionsNamespace('theprefix', types)
    expect(Object.keys(result.types).length).toBe(types.length * 3)
  })

  it('returns an object with actions with the default meta', () => {
    const result = actionsNamespace('theprefix', types)
    expect(Object.keys(result.actions).length).toBe(types.length)
    expect(result.actions.addSpices('payload')).toEqual({
      type: 'theprefix/ADD_SPICES',
      payload: 'payload',
      meta: {
        successType: 'theprefix/ADD_SPICES_SUCCESS',
        failureType: 'theprefix/ADD_SPICES_FAILURE',
      },
    })
  })
})
