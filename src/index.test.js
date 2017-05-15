import { actionsNamespace, simpleAsync } from './'

describe('redux-belt', () => {
  test('exports actionsNamespace', () => {
    expect(typeof actionsNamespace).toBe('function')
  })

  test('exports simpleAsync', () => {
    expect(typeof simpleAsync).toBe('function')
  })
})
