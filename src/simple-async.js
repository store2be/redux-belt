import { put, call, select } from 'redux-saga/effects'

import * as utils from './utils'

export default function simpleAsync(descriptor) {
  if (typeof descriptor.effect !== 'function') {
    throw new Error('invalid descriptor for simpleAsync: "effect" must be a function')
  }
  return function* simpleSaga(action) {
    if (descriptor.shouldRun && (!action.meta || !action.meta.refresh)) {
      const state = yield select(utils.identity)
      if (!descriptor.shouldRun(state, action)) {
        return
      }
    }
    const { failureType, successType } = action.meta
    try {
      const response = yield call(...descriptor.effect(action.payload))
      yield put({ type: successType, payload: response.data, meta: { originalAction: action } })
      if (descriptor.afterSuccess) {
        const pending = descriptor.afterSuccess(response, action.payload)
        if (pending instanceof Array) {
          for (let i = 0; i < pending.length; i += 1) {
            yield put(pending[i])
          }
        } else {
          yield put(pending)
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404 && descriptor.on404) {
        const pending = descriptor.on404(action.payload)
        if (pending instanceof Array) {
          for (let i = 0; i < pending.length; i += 1) {
            yield put(pending[i])
          }
        } else {
          yield put(pending)
        }
      } else {
        yield put(utils.action(failureType, error.response, { originalAction: action }))
      }
    }
  }
}