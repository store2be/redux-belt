import { put, call, select } from 'redux-saga/effects'

import * as utils from './utils'

export default function simpleAsync(descriptor) {
  if (typeof descriptor.effect !== 'function') {
    throw new Error('Invalid descriptor for simpleAsync: "effect" must be a function')
  }
  return function* simpleSaga(action) {
    if (!action.meta) {
      throw new Error(
        `The action ${
          action.type
        } is not generated by redux-belt/actionsNamespace and lacks the required "meta" property`,
      )
    }
    if (descriptor.shouldRun && (!action.meta.refresh)) {
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
        const pending = descriptor.afterSuccess(response, action.payload, action.meta)
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
        const pending = descriptor.on404(action.payload, action.meta)
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
