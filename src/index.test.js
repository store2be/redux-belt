import {
  actions,
  crudReducer,
  crudState,
  actionsIncludingCrud,
  simpleAsync,
} from './'

describe('redux-belt', () => {
  test('exports actions', () => {
    expect(typeof actions).toBe('function')
  })

  test('exports simpleAsync', () => {
    expect(typeof simpleAsync).toBe('function')
  })

  test('exports actionsIncludingCrud', () => {
    expect(typeof actionsIncludingCrud).toBe('function')
  })

  test('exports crudReducer', () => {
    expect(typeof crudReducer).toBe('function')
  })

  test('exports crudState', () => {
    expect(typeof crudState).toBe('object')
  })
})
