import jsc from 'jsverify'
import update from 'immutability-helper'

import * as generators from './generators'
import * as utils from './utils'
import { crudReducer, crudActionsNamespace } from './crud'

const actions = crudActionsNamespace('test')

describe('utils/crud', () => {
  describe('crudReducer', () => {
    test('is a function', () => {
      expect(typeof crudReducer).toBe('function')
    })

    describe('on empty action', () => {
      test('does not react', () => {
        jsc.assertForall(generators.crudReducerState, (state) => {
          const before = JSON.stringify(state)
          const result = JSON.stringify(crudReducer(state, {}, actions))
          const after = JSON.stringify(state)
          return before === result && result === after
        })
      })
    })

    describe('on CREATE', () => {
      test('just sets the create loading to true', () => {
        jsc.assertForall(generators.crudReducerState, jsc.dict(jsc.json), (state, payload) => {
          const before = JSON.stringify(state)
          const expected = JSON.stringify(update(state, { loading: { create: { $set: true } } }))
          const result = JSON.stringify(crudReducer(state, actions.create(payload), actions))
          const after = JSON.stringify(state)
          return before === after && result === expected
        })
      })
    })

    describe('on CREATE_SUCCESS', () => {
      test('sets the create loading to false, reset changes and sets single', () => {
        jsc.assertForall(generators.crudReducerState, jsc.dict(jsc.json), (state, payload) => {
          const before = JSON.stringify(state)
          const result = crudReducer(state, utils.action(actions.CREATE_SUCCESS, payload), actions)
          const after = JSON.stringify(state)
          return before === after &&
            result.loading.create === false &&
            Object.keys(result.changes).length === 0 &&
            JSON.stringify(payload) === JSON.stringify(result.single)
        })
      })
    })

    describe('on CREATE_FAILURE', () => {
      test('sets the loading to false and the keeps the errors', () => {
        jsc.assertForall(
          generators.crudReducerState,
          generators.errorResponse,
          (state, payload) => {
            const before = JSON.stringify(state)
            const result = crudReducer(state, utils.action(actions.CREATE_FAILURE, payload), actions)
            const after = JSON.stringify(state)
            return before === after &&
              result.loading.create === false &&
              result.errors.length === payload.errors.length
          }
        )
      })
    })

    describe('on DELETE', () => {
      test('sets the delete loading to true', () => {
        jsc.assertForall(
          generators.crudReducerState,
          generators.uuid,
          (state, payload) => {
            const before = JSON.stringify(state)
            const result = crudReducer(state, actions.delete(payload), actions)
            const after = JSON.stringify(state)
            return before === after &&
              result.loading.deleting === true
          }
        )
      })
    })

    describe('on DELETE_FAILURE', () => {
      test('does not react', () => {
        jsc.assertForall(generators.crudReducerState, jsc.json, (state, payload) => {
          const before = JSON.stringify(state)
          const result = JSON.stringify(
            crudReducer(state, utils.action(actions.DELETE_FAILURE, payload), actions))
          const after = JSON.stringify(state)
          return before === result && result === after
        })
      })
    })

    describe('on DELETE_SUCCESS', () => {
      test('removes the entry from the index', () => {
        const before = {
          index: [{ id: 'abc', num: 3 }, { id: 'def', num: 4 }, { id: 'ghi', num: 5 }],
        }

        expect(crudReducer(before, {
          type: actions.DELETE_SUCCESS,
          payload: undefined,
          meta: { originalAction: { payload: { id: 'def' } } },
        }, actions)).toEqual({ index: [{ id: 'abc', num: 3 }, { id: 'ghi', num: 5 }] })
      })
    })

    describe('on FETCH_INDEX', () => {
      test('sets the index loading to true and ignores the payload', () => {
        jsc.assertForall(generators.crudReducerState, jsc.dict(jsc.json), (state, payload) => {
          const before = JSON.stringify(state)
          const expected = JSON.stringify(update(state, {
            loading: { index: { $set: true } },
            filters: { $set: payload },
          }))
          const result = JSON.stringify(crudReducer(state, actions.fetchIndex(payload), actions))
          const after = JSON.stringify(state)
          return before === after && result === expected
        })
      })
    })

    describe('on FETCH_INDEX_FAILURE', () => {
      test('does not react', () => {
        jsc.assertForall(generators.crudReducerState, jsc.json, (state, payload) => {
          const before = JSON.stringify(state)
          const result = JSON.stringify(
            crudReducer(state, utils.action(actions.DELETE_FAILURE, payload), actions))
          const after = JSON.stringify(state)
          return before === result && result === after
        })
      })
    })

    describe('on FETCH_INDEX_SUCCESS', () => {
      const indexResult = jsc.record({
        data: jsc.array(jsc.dict(jsc.json)),
        meta_data: jsc.record({ page: jsc.nat }),
      })

      test('sets loading to false, the index to the payload, and metadata accordingly', () => {
        jsc.assertForall(generators.crudReducerState, indexResult, (state, payload) => {
          const before = JSON.stringify(state)
          const result = crudReducer(state, utils.action(actions.FETCH_INDEX_SUCCESS, payload), actions)
          const after = JSON.stringify(state)
          return before === after &&
            JSON.stringify(result.index) === JSON.stringify(payload.data) &&
            result.metaData.page === payload.meta_data.page &&
            result.loading.index === false
        })
      })
    })

    describe('on FETCH_SINGLE', () => {
      test('sets loading to true and keeps single', () => {
        jsc.assertForall(generators.crudReducerState, generators.uuid, (state, payload) => {
          const before = JSON.stringify(state)
          const result = crudReducer(state, actions.fetchSingle(payload), actions)
          const after = JSON.stringify(state)
          return before === after &&
            JSON.stringify(state.single) === JSON.stringify(result.single) &&
            result.loading.single === true
        })
      })
    })

    describe('on FETCH_SINGLE_FAILURE', () => {
      test('sets loading to false', () => {
        jsc.assertForall(generators.crudReducerState, (state) => {
          const before = JSON.stringify(state)
          const result = crudReducer(state, utils.action(actions.FETCH_SINGLE_FAILURE, 'fail'), actions)
          const after = JSON.stringify(state)
          return before === after &&
            result.loading.single === false
        })
      })
    })

    describe('on FETCH_SINGLE_SUCCESS', () => {
      test('stores the fetched item', () => {
        jsc.assertForall(generators.crudReducerState, (state) => {
          const before = JSON.stringify(state)
          const result = crudReducer(state, utils.action(actions.FETCH_SINGLE_SUCCESS, 'thatsit'), actions)
          const after = JSON.stringify(state)
          return before === after &&
            result.loading.single === false &&
            result.single === 'thatsit'
        })
      })
    })

    describe('on UPDATE', () => {
      test('sets the loading state', () => {
        jsc.assertForall(generators.crudReducerState, (state) => {
          const before = JSON.stringify(state)
          const result = crudReducer(state, actions.update({ something: 'a' }), actions)
          const after = JSON.stringify(state)
          return before === after &&
            result.loading.update === true
        })
      })
    })

    describe('on UPDATE_SUCCESS', () => {
      test('resets the changes and saves the updated value', () => {
        jsc.assertForall(generators.crudReducerState, (state) => {
          const before = JSON.stringify(state)
          const result = crudReducer(state, utils.action(actions.UPDATE_SUCCESS, 'thatsit'), actions)
          const after = JSON.stringify(state)
          return before === after &&
            result.loading.update === false &&
            result.errors.length === 0 &&
            Object.keys(result.changes).length === 0 &&
            result.single === 'thatsit'
        })
      })

      describe('when the item is also present in index', () => {
        test('updates it', () => {
          jsc.assertForall(generators.crudReducerState, (state) => {
            if (state.index.length === 0) {
              return true
            }
            const randomIndex = Math.floor(Math.random() * state.index.length)
            const newIndex = [...state.index]
            newIndex[randomIndex] = { id: 'abc', name: 'thatsit' }
            const newState = {
              ...state,
              index: newIndex,
            }
            const result = crudReducer(newState, utils.action(actions.UPDATE_SUCCESS, {
              id: 'abc',
              name: 'thatsthat',
            }), actions)
            return result.index[randomIndex].id === 'abc' &&
              result.index[randomIndex].name === 'thatsthat' &&
              result.index.length === state.index.length
          })
        })
      })

      describe('when the item is not in index', () => {
        test('does not affect index', () => {
          jsc.assertForall(generators.crudReducerState, (state) => {
            const before = JSON.stringify(state.index)
            const result = crudReducer(state, utils.action(actions.UPDATE_SUCCESS, {
              id: 'abc',
              name: 'thatsit',
            }), actions)
            const after = JSON.stringify(state.index)
            return before === after && after === JSON.stringify(result.index)
          })
        })
      })
    })

    describe('on UPDATE_FAILURE', () => {
      test('saves the errors', () => {
        jsc.assertForall(
          generators.crudReducerState,
          generators.errorResponse,
          (state, payload) => {
            const before = JSON.stringify(state)
            const result = crudReducer(state, utils.action(actions.UPDATE_FAILURE, payload), actions)
            const after = JSON.stringify(state)
            return before === after &&
              result.loading.update === false &&
              Object.keys(result.changes).length === Object.keys(state.changes).length &&
              result.errors.length === payload.errors.length
          }
        )
      })
    })

    describe('on MERGE_CHANGES', () => {
      test('merges the changes', () => {
        const before = { changes: { a: 'b' } }
        const result = crudReducer(before, actions.mergeChanges({ potato: 'salad' }), actions)
        expect(result).toEqual({ changes: { a: 'b', potato: 'salad' } })
      })
    })

    describe('on SET_CHANGES', () => {
      test('sets the changes', () => {
        const before = { changes: { a: 'b' } }
        const result = crudReducer(before, actions.setChanges({ potato: 'salad' }), actions)
        expect(result).toEqual({ changes: { potato: 'salad' } })
      })
    })
  })
})

