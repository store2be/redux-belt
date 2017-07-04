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

describe('updateEntryWithId', () => {
  const oldEntry = { id: 'ab12449', name: 'troufignole' }
  const newEntry = { id: 'ab12449', name: 'tartempion' }
  const unrelatedEntry = { id: '989e22-21', name: 'something else' }

  test('returns an empty array when given an empty array', () => {
    expect(utils.updateEntryWithId([], newEntry).length).toEqual(0)
  })

  test('does not change entries with different ids', () => {
    expect(
      utils.updateEntryWithId([oldEntry, unrelatedEntry],
        newEntry)[1].id
    ).toEqual(unrelatedEntry.id)
  })

  test('does not change the order of entries', () => {
    expect(utils.updateEntryWithId(
      [unrelatedEntry, oldEntry, unrelatedEntry],
      newEntry)[2].id
    ).toEqual(unrelatedEntry.id)
  })

  test('does not change the array length', () => {
    expect(utils.updateEntryWithId(
      [unrelatedEntry, oldEntry, unrelatedEntry],
      newEntry
    ).length).toEqual(3)
  })

  test('replaces the old entry with the new one', () => {
    expect(utils.updateEntryWithId(
      [unrelatedEntry, oldEntry, unrelatedEntry],
      newEntry
    )[1].id).toEqual(newEntry.id)
  })

  test('does not mutate the old array', () => {
    const oldArray = [unrelatedEntry, oldEntry, unrelatedEntry]
    utils.updateEntryWithId([unrelatedEntry, oldEntry, unrelatedEntry], newEntry)
    expect(oldArray[1].id).toEqual(oldEntry.id)
  })
})

