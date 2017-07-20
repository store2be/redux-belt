import update from 'immutability-helper'

import actions from './actions'
import { replaceEntry } from './utils'

const crudActionTypes = [
  'CANCEL_LOADING',
  'CREATE',
  'DELETE',
  'FETCH_INDEX',
  'FETCH_SINGLE',
  'MERGE_CHANGES',
  'SET_CHANGES',
  'UPDATE',
]

export function actionsIncludingCrud(prefix, actionTypes = []) {
  return actions(prefix, [...crudActionTypes, ...actionTypes])
}

/**
 * The default CRUD state for reducers, to be used in combination with crudReducer.
 *
 * Just spread this inside the default state of the reducer, like so:
 *
 * state = {
 *  ...crudState,
 *  spaghetti: [],
 *  sauceSpiciness: 9001,
 * }
 *
 */
export const crudState = {
  changes: {},
  errors: [],
  filters: {},
  loading: {
    create: false,
    delete: false,
    index: false,
    single: false,
    update: false,
  },
  index: [],
  meta: {},
  single: {},
}

export const configureCrudReducer = extractors => (state, action, t) => {
  const { meta, payload, type } = action
  switch (type) {
    case t.CREATE:
      return update(state, {
        loading: {
          create: { $set: true },
        },
      })
    case t.CREATE_SUCCESS:
      return update(state, {
        loading: {
          create: { $set: false },
        },
        changes: { $set: {} },
        errors: { $set: [] },
        single: { $set: extractors.single(action, state) },
      })
    case t.CREATE_FAILURE:
      return update(state, {
        loading: {
          create: { $set: false },
        },
        errors: { $set: extractors.error(action, state) },
      })

    case t.DELETE:
      return update(state, {
        loading: {
          delete: { $set: true },
        },
      })
    case t.DELETE_SUCCESS:
    case t.DELETE_FAILURE:
      return update(state, {
        loading: {
          delete: { $set: false },
        },
      })

    case t.FETCH_INDEX:
      return update(state, {
        filters: { $set: payload || {} },
        loading: {
          index: { $set: true },
        },
      })
    case t.FETCH_INDEX_SUCCESS:
      return update(state, {
        loading: {
          index: { $set: false },
        },
        index: { $set: extractors.index(action, state) },
        meta: { $set: extractors.meta(action, state) },
      })
    case t.FETCH_INDEX_FAILURE:
      return update(state, {
        loading: {
          index: { $set: false },
        },
      })

    case t.FETCH_SINGLE:
      return update(state, {
        loading: {
          single: { $set: true },
        },
      })
    case t.FETCH_SINGLE_SUCCESS:
      return update(state, {
        loading: {
          single: { $set: false },
        },
        single: { $set: extractors.single(action, state) },
      })
    case t.FETCH_SINGLE_FAILURE:
      return update(state, {
        loading: {
          single: { $set: false },
        },
      })

    case t.MERGE_CHANGES:
      return update(state, {
        changes: { $merge: action.payload },
      })
    case t.SET_CHANGES:
      return update(state, {
        changes: { $set: action.payload },
      })

    case t.UPDATE:
      return update(state, {
        loading: {
          update: { $set: true },
        },
      })
    case t.UPDATE_SUCCESS:
      return update(state, {
        loading: {
          update: { $set: false },
        },
        changes: { $set: {} },
        errors: { $set: [] },
        index: { $apply: replaceEntry(extractors.single(action, state)) },
        single: { $set: extractors.single(action, state) },
      })
    case t.UPDATE_FAILURE:
      return update(state, {
        loading: {
          update: { $set: false },
        },
        errors: { $set: extractors.error(action, state) },
      })
    default:
      return state
  }
}

export const crudReducer = configureCrudReducer({
  index: action => action.payload,
  meta: () => {},
  error: action => action.payload,
  single: action => action.payload,
})
