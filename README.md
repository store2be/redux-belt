# redux-belt

[![Build Status](https://travis-ci.org/store2be/redux-belt.svg?branch=master)](https://travis-ci.org/store2be/redux-belt)

This library provides several highly opinionated helpers which ought to be useful while developing big apps with React, Redux and Sagas. These helpers ensure the keeping of best practices and their main goal is to reduce the amount of boilerplate introduced by Redux code, while avoiding conflict with Redux design decisions.

**redux-belt uses semantic versioning. So until 1.0.0 is reached expect many breaking changes.**

Here are the design-defining constraints that `redux-belt` introduces:
- Redux action creators should contain no logic. This would not work with `redux-thunk`, but we're using `redux-saga` here. Your application's logic should be handled by the structure of the actions themselves, or by the final consumers of an action's payload.
- When using an action creator, the generated action's payload should stay untouched from the moment it is created, until it reaches its destination within the app (for example when it's used in an API call, or when it's used in a reducer).
- Action types, namespacing and action creators should all be given consistent names, and this name should only be defined in one place.

Visit the [redux-belt homepage](https://store2be.github.io/redux-belt/).

## Installation

### With yarn

```
$ yarn add redux-belt
```

### With npm

```
$ npm install --save redux-belt
```

## Generating action creators and action types

Redux actions creators should be doomed to staying dumb from the moment of their inception. The goal of a Redux action is to notify the app of an intention to mutate the data. From the Redux docs:

> Actions are plain objects describing what happened in the app, and serve as the sole way to describe an intention to mutate the data.

To apply this statement's meaning to its fullest, `redux-belt` provides a function called `actionsNamespace`. Typically, in anything bigger than a mid-sized application, developers use a file in each namespace for defining action types, and another for the action creators themselves. This helps with namespacing and introduces a lot of clarity in the code. Another thing it introduces is a *huge amount of boilerplate* which we could diminish to its smallest possible form. Here's an example using `actionsNamespace`:

In `actions.js`
```javascript
import { actionsNamespace } from 'redux-belt'

export const { actions, types } = actionsNamespace('books', ['ADD_BOOK'])
```

In another file:
```javascript
import { actions, types } from './actions'

/**
 * types: {
 *   ADD_BOOK: 'books/ADD_BOOK',
 *   ADD_BOOK_SUCCESS: 'books/ADD_BOOK_SUCCESS',
 *   ADD_BOOK_FAILURE: 'books/ADD_BOOK_FAILURE'
 * }
 *
 * actions: {
 *   addBook: (an action creator for ADD_BOOK which takes only one argument)
 * }
 */
```

When calling the action creator `addBook`, it will generate an action with the following shape:
```javascript
addBook({ id: 1, title: 'The Stranger', author: 'Albert Camus' })

/**
 * => {
 *   type: 'books/ADD_BOOK',
 *   payload: {
 *     id: 1,
 *     title: 'The Stranger',
 *     author: 'Albert Camus'
 *   },
 *   meta: {
 *     success: 'books/ADD_BOOK_SUCCESS',
 *     failure: 'books/ADD_BOOK_FAILURE'
 *   }
 * }
 *
 */
```

Using this helper makes it mandatory to always have action creators that accept **only one argument**. It also (obviously) **generates action creators implicitly**. You might think this is a terrible idea, but here are some arguments in its favor:
- This provides a standard for action creation and usage of payloads throughout the app. Such a standard is usually missing in big projects, and this can lead to some highly time-consuming development hassles.
- You don't have to worry about how you defined your action creator. When using it, you know it will accept only one argument, and you'll be happy that you can just pass an object, or a primitive, and access it directly when you use the action somewhere else (in a reducer or in a saga).
- If the naming convention you chose for your action types is consistent and meaningful, you'll only need to check **one file** to figure out how your action creators work, how they're named, and what they do.
- Your logic is kept for the reducer and/or the saga to handle.
- Giving your actions a namespace is trivial.

## Side-effects with redux-saga

Using the `redux-belt` generated actions, you can write sagas that make use of the `meta` object:

```javascript
import { types } from './actions'
import { requestAddBook } from './api'

function* asyncAddBook(action) {
  try {
    const response = yield call(requestAddBook, action.payload)
    yield put({ type: action.meta.success, payload: response.data })
  } catch (error) {
    yield put({ type: action.meta.failure, payload: error })
  }
}

function* booksSaga() {
  yield takeEvery(types.ADD_BOOK, asyncAddBook)
}
```

The general use case for a saga is to wrap Redux actions around a server request, or an impure function, or whatever it is that takes time to complete. In the simplest (and most common) scenario, a saga tries to call a function. If it succeeds, it dispatches a success action. If it fails, it dispatches a failure action. For all these use cases, `redux-belt` provides the `simpleAsync` function, which works with `redux-belt` generated actions:

```javascript
import { simpleAsync } from 'redux-belt'

// This does exactly the same as the example saga above
const asyncAddBook = simpleAsync({ effect: requestAddBook })

function* booksSaga() {
  yield takeEvery(types.ADD_BOOK, asyncAddBook)
}

/**
 * Now, calling addBook with an argument like this:
 * addBook({ id: 1, title: 'The Stranger', author: 'Albert Camus' })
 *
 * Will trigger asyncAddBook, which will call requestAddBook with exactly the same payload:
 * { id: 1, title: 'The Stranger', author: 'Albert Camus' }
 */
```

In a more complicated scenario, a saga could call yet another set of actions on success. You can do this with `simpleAsync` by providing a function to the `afterSuccess` key. The function provided to `afterSuccess` will be called with two arguments: the **original payload** passed to the action and the **response from the effect**. You can choose to pass whichever you want, in this case we're passing the response:

```javascript
import { simpleAsync } from 'redux-belt'

const asyncAddBook = simpleAsync({
  effect: requestAddBook,
  afterSuccess: (payload, response) => addBookSuggestions(response)
})

function* booksSaga() {
  yield takeEvery(types.ADD_BOOK, asyncAddBook)
}
```

In a reducer, you can react to the actions dispatched by these sagas like so:
```javascript
import { types } from './actions'

function booksReducer(state = {}, action) {
  switch (action.type) {
    case types.ADD_BOOK:
      // Do something
    case types.ADD_BOOK_SUCCESS:
      // Do something
    case types.ADD_BOOK_FAILURE:
      // Do something
    default:
      return state
  }
}
```
