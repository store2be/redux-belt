import * as utils from './utils'

describe('action', () => {
  it('is a function', () => {
    expect(typeof utils.action).toBe('function')
  })

  it('returns a well formed action with the default meta', () => {
    expect(utils.action('thetype', { message: 'the payload' })).toEqual({
      type: 'thetype',
      payload: {
        message: 'the payload',
      },
      meta: undefined,
    })
  })

  it('works even without a payload', () => {
    expect(utils.action('some type')).toEqual({
      type: 'some type',
      payload: undefined,
      meta: undefined,
    })
  })

  it('works without a meta field', () => {
    expect(utils.action('some type', '', { garbage: 'day' })).toEqual({
      type: 'some type',
      payload: '',
      meta: {
        garbage: 'day',
      },
    })
  })
})

describe('actionCreator', () => {
  it('is a function', () => {
    expect(typeof utils.actionCreator).toBe('function')
  })

  it('returns a function', () => {
    expect(typeof utils.actionCreator('action type')).toBe('function')
  })

  it('ultimately produces the expected action with the default meta', () => {
    const action = {
      type: 'AN_ACTION',
      payload: { id: 21, data: 'the_data' },
      meta: {},
    }
    // const result = actionCreator(action.type)(action.payload)
    expect(JSON.stringify(utils.actionCreator(action.type)(action.payload))).toBe(
      JSON.stringify(action)
    )
  })
})

describe('snakeCaseToCamel', () => [
  ['ADD', 'add'],
  ['FETCH_STORES', 'fetchStores'],
  ['FETCH_ABOUT_200_STORES', 'fetchAbout200Stores'],
  ['REMOVE_SPACE', 'removeSpace'],
  ['', ''],
].forEach((item) => {
  it(`returns "${item[1]}" when given "${item[0]}"`, () => {
    expect(utils.snakeCaseToCamel(item[0])).toBe(item[1])
  })
}))

describe('refresh', () => {
  it('is a function', () => {
    expect(typeof utils.refresh).toBe('function')
  })

  it('preserves the action type', () => {
    expect(utils.refresh(utils.actionCreator('THE-TYPE'))().type).toBe('THE-TYPE')
  })

  it('preserves the action payload', () => {
    expect(utils.refresh(utils.actionCreator('THE-TYPE'))({ a: true }).payload.a).toBe(true)
  })

  it('preserves the action meta field', () => {
    expect(utils.refresh(() => ({ type: 'meh', meta: { aa: 'aaa' } }))().meta.aa).toBe('aaa')
  })

  it('sets refresh to true in the meta field', () => {
    expect(utils.refresh(utils.actionCreator('TY'))().meta.refresh).toBe(true)
  })
})
