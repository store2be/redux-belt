import update from 'immutability-helper'

import actionsNamespace from './actions-namespace'
import { replaceEntry } from './utils'

const crudActionTypes = [
  'CREATE',
  'DELETE',
  'FETCH_INDEX',
  'FETCH_SINGLE',
  'MERGE_CHANGES',
  'SET_CHANGES',
  'UPDATE',
]

export function crudActionsNamespace(prefix, actionTypes = []) {
  return actionsNamespace(prefix, [...crudActionTypes, ...actionTypes])
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
    index: false,
    single: false,
    update: false,
  },
  index: [],
  metaData: {},
  single: {},
}

/**
 * This function is meant to be used in default position on reducer switches.
 * It does not have its own state but expects the standard CRUD reducer state
 * to be passed to it. It does *not* work as a standalone reducer.
 */
export function crudReducer(state, action, t) {
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
        single: { $set: action.payload },
      })
    case t.CREATE_FAILURE:
      return update(state, {
        loading: {
          create: { $set: false },
        },
        errors: { $set: action.payload.errors },
      })
    case t.DELETE:
      return update(state, {
        loading: {
          deleting: { $set: true },
        },
      })
    case t.DELETE_SUCCESS:
      return update(state, {
        index: {
          $apply: entries => entries.filter(entry => entry.id !== meta.originalAction.payload.id),
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
        index: { $set: payload.data },
        metaData: { $set: payload.meta_data },
      })
    case t.FETCH_SINGLE:
      return update(state, {
        loading: {
          single: { $set: true },
        },
      })
    case t.FETCH_SINGLE_FAILURE:
      return update(state, {
        loading: {
          single: { $set: false },
        },
      })
    case t.FETCH_SINGLE_SUCCESS:
      return update(state, {
        loading: {
          single: { $set: false },
        },
        single: { $set: action.payload },
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
    case t.UPDATE_FAILURE:
      return update(state, {
        loading: {
          update: { $set: false },
        },
        errors: { $set: action.payload.errors },
      })
    case t.UPDATE_SUCCESS:
      return update(state, {
        loading: {
          update: { $set: false },
        },
        changes: { $set: {} },
        errors: { $set: [] },
        index: { $apply: replaceEntry(action.payload) },
        single: { $set: action.payload },
      })
    default:
      return state
  }
}

