import { call, put } from 'redux-saga/effects'

import simpleAsync from './simple-async'
import * as utils from './utils'

describe('simpleAsync', () => {
  it('produces a generator function', () => {
    const sampleGenerator = function* sampleGenerator() { yield }
    expect(simpleAsync({ effect: () => true }).constructor).toBe(sampleGenerator.constructor)
  })

  let generator

  describe('in the simple case', () => {
    it('first yields the effect with the right parameters', () => {
      const fakeFunction = () => true
      const action = {
        type: 'GET_THE_WATER',
        payload: {
          foo: 'fux',
          bar: 'baz',
          qux: 'frob',
        },
        meta: {
          failureType: 'GET_THE_WATER_FAILURE',
          successType: 'GET_THE_WATER_SUCCESS',
        },
      }
      const expected = call(fakeFunction, action.payload.foo, action.payload.bar)
      generator = simpleAsync({
        effect: payload => [fakeFunction, payload.foo, payload.bar],
      })(action)
      const next = generator.next()
      expect(next.value).toEqual(expected)
      expect(next.done).toBe(false)
    })

    it('then puts the success action with response.data as a payload', () => {
      const next = generator.next({ data: 'myresponsetext' })
      expect(next.value).toEqual(put({
        type: 'GET_THE_WATER_SUCCESS',
        payload: 'myresponsetext',
        meta: {
          originalAction: {
            type: 'GET_THE_WATER',
            payload: {
              foo: 'fux',
              bar: 'baz',
              qux: 'frob',
            },
            meta: {
              failureType: 'GET_THE_WATER_FAILURE',
              successType: 'GET_THE_WATER_SUCCESS',
            },
          },
        },
      }))
      expect(next.done).toBe(false)
    })

    it('is then done', () => {
      const next = generator.next()
      expect(next.value).not.toBeDefined()
      expect(next.done).toBe(true)
    })
  })

  describe('with a failed request', () => {
    const fakeFunction = () => true
    const action = {
      type: 'GET_THE_WATER',
      payload: {
        foo: 'fux',
        bar: 'baz',
        qux: 'frob',
      },
      meta: {
        failureType: 'GET_THE_WATER_FAILURE',
        successType: 'GET_THE_WATER_SUCCESS',
      },
    }
    it('first yields the api call with the right parameters', () => {
      const expected = call(fakeFunction, action.payload.foo, action.payload.bar)
      generator = simpleAsync({
        effect: payload => [fakeFunction, payload.foo, payload.bar],
      })(action)
      const next = generator.next()
      expect(next.value).toEqual(expected)
      expect(next.done).toBe(false)
    })

    it('then puts the failure action with response.data as a payload and originalAction in meta', () => {
      const next = generator.throw({ response: { data: 'it’s broke' } })
      expect(next.done).toBe(false)
      expect(next.value).toEqual(put({
        type: 'GET_THE_WATER_FAILURE',
        payload: { data: 'it’s broke' },
        meta: { originalAction: action },
      }))
    })

    it('is then done', () => {
      const next = generator.next()
      expect(next.value).not.toBeDefined()
      expect(next.done).toBe(true)
    })
  })

  describe('with an afterSuccess', () => {
    it('first yields the api call with the right parameters', () => {
      const fakeFunction = () => true
      const action = {
        type: 'GET_THE_WATER',
        payload: {
          foo: 'fux',
          bar: 'baz',
          qux: 'frob',
        },
        meta: {
          failureType: 'GET_THE_WATER_FAILURE',
          successType: 'GET_THE_WATER_SUCCESS',
        },
      }
      const expected = call(fakeFunction, action.payload.foo, action.payload.bar)
      generator = simpleAsync({
        effect: payload => [fakeFunction, payload.foo, payload.bar],
        afterSuccess: response => ({ type: 'IT_WORKED', payload: response.data.message }),
      })(action)
      const next = generator.next()
      expect(next.value).toEqual(expected)
      expect(next.done).toBe(false)
    })

    it('then puts the success action with response.data as a payload', () => {
      const next = generator.next({ data: { message: 'high five' } })
      expect(next.value).toEqual(put({
        type: 'GET_THE_WATER_SUCCESS',
        payload: { message: 'high five' },
        meta: {
          originalAction: {
            type: 'GET_THE_WATER',
            payload: {
              foo: 'fux',
              bar: 'baz',
              qux: 'frob',
            },
            meta: {
              failureType: 'GET_THE_WATER_FAILURE',
              successType: 'GET_THE_WATER_SUCCESS',
            },
          },
        },
      }))
      expect(next.done).toBe(false)
    })

    it('then puts the afterSuccess', () => {
      const expected = { type: 'IT_WORKED', payload: 'high five' }
      const next = generator.next()
      expect(next.value).toEqual(put(expected))
      expect(next.done).toBe(false)
    })

    it('is then done', () => {
      const next = generator.next()
      expect(next.value).not.toBeDefined()
      expect(next.done).toBe(true)
    })
  })

  describe('with an afterSuccess that returns an array of actions', () => {
    it('first yields the api call with the right parameters', () => {
      const fakeFunction = () => true
      const action = {
        type: 'GET_THE_WATER',
        payload: {
          foo: 'fux',
          bar: 'baz',
          qux: 'frob',
        },
        meta: {
          failureType: 'GET_THE_WATER_FAILURE',
          successType: 'GET_THE_WATER_SUCCESS',
        },
      }
      const expected = call(
        fakeFunction,
        action.payload.foo,
        action.payload.bar)
      generator = simpleAsync({
        effect: payload => [fakeFunction, payload.foo, payload.bar],
        afterSuccess: (response, payload) => [
          { type: 'IT_WORKED', payload: response.data.message },
          { type: 'IT_WORKED_2', payload: `${response.data.message} + 1` },
          { type: 'IT_WORKED_3', payload: payload.qux },
        ],
      })(action)
      const next = generator.next()
      expect(next.value).toEqual(expected)
      expect(next.done).toBe(false)
    })

    it('then puts the success action with response.data as a payload', () => {
      const next = generator.next({ data: { message: 'high five' } })
      expect(next.value).toEqual(put({
        type: 'GET_THE_WATER_SUCCESS',
        payload: { message: 'high five' },
        meta: {
          originalAction: {
            type: 'GET_THE_WATER',
            payload: {
              foo: 'fux',
              bar: 'baz',
              qux: 'frob',
            },
            meta: {
              failureType: 'GET_THE_WATER_FAILURE',
              successType: 'GET_THE_WATER_SUCCESS',
            },
          },
        },
      }))
      expect(next.done).toBe(false)
    })

    it('then puts the afterSuccessHooks', () => {
      const expected = { type: 'IT_WORKED', payload: 'high five' }
      const next = generator.next({})
      expect(next.value).toEqual(put(expected))
      expect(next.done).toBe(false)
      const expectedP = { type: 'IT_WORKED_2', payload: 'high five + 1' }
      const nextP = generator.next({})
      expect(nextP.value).toEqual(put(expectedP))
      expect(nextP.done).toBe(false)
      const expectedPP = { type: 'IT_WORKED_3', payload: 'frob' }
      const nextPP = generator.next({})
      expect(nextPP.value).toEqual(put(expectedPP))
      expect(nextPP.done).toBe(false)
    })

    it('is then done', () => {
      const next = generator.next()
      expect(next.value).not.toBeDefined()
      expect(next.done).toBe(true)
    })
  })

  describe('with a 404 and an on404 callback', () => {
    it('first yields the api call with the right parameters', () => {
      const fakeFunction = () => true
      const action = {
        type: 'GET_THE_WATER',
        payload: {
          foo: 'fux',
          bar: 'baz',
          qux: 'frob',
        },
        meta: {
          failureType: 'GET_THE_WATER_FAILURE',
          successType: 'GET_THE_WATER_SUCCESS',
        },
      }
      const expected = call(
        fakeFunction,
        action.payload.foo,
        action.payload.bar)
      generator = simpleAsync({
        effect: payload => [fakeFunction, payload.foo, payload.bar],
        afterSuccess: response => [
          { type: 'IT_WORKED', payload: response.data.message },
        ],
        on404: payload => [
          { type: 'TEST__NOT_FOUND', payload: { message: ':(' } },
          { type: 'TEST__NOT_FOUND', payload },
        ],
      })(action)
      const next = generator.next()
      expect(next.value).toEqual(expected)
      expect(next.done).toBe(false)
    })

    it('then dispatches the actions returned by on404', () => {
      let next = generator.throw({ response: { status: 404 } })
      expect(next.value).toEqual(put({
        type: 'TEST__NOT_FOUND',
        payload: { message: ':(' },
      }))
      expect(next.done).toBe(false)
      next = generator.next({})
      expect(next.value).toEqual(put({
        type: 'TEST__NOT_FOUND',
        payload: {
          foo: 'fux',
          bar: 'baz',
          qux: 'frob',
        },
      }))
      expect(next.done).toBe(false)
    })

    it('is then done', () => {
      const next = generator.next()
      expect(next.value).not.toBeDefined()
      expect(next.done).toBe(true)
    })
  })

  describe('with a shouldRun that returns true', () => {
    const action = utils.action('FETCH_RESOURCE', { id: 33 }, {
      failureType: 'FETCH_RESOURCE_FAILURE',
      successType: 'FETCH_RESOURCE_SUCCESS',
    })
    let next

    beforeAll(() => {
      generator = simpleAsync({
        effect: () => [utils.noop],
        shouldRun: (state, ac) => state.resourceId !== ac.payload.id,
      })(action)
    })

    it('first selects the whole state and performs the effect', () => {
      next = generator.next()
      expect(next.done).toBe(false)
      expect(next.value.SELECT).toBeDefined()
      next = generator.next({ resourceId: 12 })
      expect(next.done).toBe(false)
      expect(next.value).toEqual(call(utils.noop))
    })
  })

  describe('with a shouldRun that returns false', () => {
    const action = utils.action('FETCH_RESOURCE', { id: 12 })
    let next

    beforeAll(() => {
      generator = simpleAsync({
        effect: () => [utils.noop],
        shouldRun: (state, ac) => state.resourceId !== ac.payload.id,
      })(action)
    })

    it('first selects the whole state', () => {
      next = generator.next()
      expect(next.done).toBe(false)
      expect(next.value.SELECT).toBeDefined()
    })

    it('then should be done', () => {
      next = generator.next({ resourceId: 12 })
      expect(next.done).toBe(true)
    })
  })

  describe('with a refresh action and a shouldRun that returns false', () => {
    const action = { ...utils.action('FETCH_RESOURCE', { id: 33 }), meta: { refresh: true } }
    let next

    beforeAll(() => {
      generator = simpleAsync({
        effect: () => [utils.noop],
        shouldRun: (state, ac) => state.resourceId !== ac.payload.id,
      })(action)
    })

    it('directly tries to perform the effect', () => {
      next = generator.next(action)
      expect(next.done).toBe(false)
      expect(next.value).toEqual(call(utils.noop))
    })
  })
})
