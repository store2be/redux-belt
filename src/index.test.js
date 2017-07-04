import {
  actionsNamespace,
  crudReducer,
  crudState,
  crudActionsNamespace,
  simpleAsync,
} from './'

describe('redux-belt', () => {
  test('exports actionsNamespace', () => {
    expect(typeof actionsNamespace).toBe('function')
  })

  test('exports simpleAsync', () => {
    expect(typeof simpleAsync).toBe('function')
  })

  test('exports crudActionsNamespace', () => {
    expect(typeof crudActionsNamespace).toBe('function')
  })

  test('exports crudReducer', () => {
    expect(typeof crudReducer).toBe('function')
  })

  test('exports crudState', () => {
    expect(typeof crudState).toBe('object')
  })
})
