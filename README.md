# redux-belt

This library provides several highly opinionated helpers which ought to be useful while developing big apps with React, Redux and Sagas. These helpers ensure the keeping of best practices and their main goal is to reduce the amount of boilerplate introduced by Redux code, while avoiding conflict with Redux design decisions.

Here are the design-defining constraints that `redux-belt` introduces:
- Redux action creators should contain no logic. This would not work with `redux-thunk`, but we're using `redux-saga` here. Your application's logic should be handled by the structure of the actions themselves, or by the final consumers of an action's payload.
- When using an action creator, its payload should stay untouched from the moment it is created, until it reaches its destination within the app (for example when it's used in an API call, or when it's used in a reducer).
- Action types, namespacing and action creators should all be given consistent names, and this name should only be defined in one place.

### Generating action creators and action types

Redux actions creators should be doomed to staying dumb from the moment of their inception. The goal of a Redux action is to notify the app of an intention to mutate the data. From the Redux docs:

> Actions are plain objects describing what happened in the app, and serve as the sole way to describe an intention to mutate the data.

To apply this statement's meaning to its fullest, `redux-belt` provides a function called `generateActions`. Typically, in anything bigger than a mid-sized application, developers use a file in each namespace for defining action types, and another for the action creators themselves. This helps with namespacing and introduces a lot of clarity in the code. Another thing it introduces is a *huge amount of boilerplate* which we could diminish to its smallest possible form. Here's an example using `generateActions`:

In `actions.js`
```javascript
export const { actions, types } = generateActions('pasta', ['ADD_OIL'])
```

In another file:
```javascript
import { actions, types } from './actions'

/**
 * types: {
 *   ADD_OIL: 'pasta/ADD_OIL',
 *   ADD_OIL_SUCCESS: 'pasta/ADD_OIL_SUCCESS',
 *   ADD_OIL_FAILURE: 'pasta/ADD_OIL_FAILURE'
 * }
 *
 * actions: {
 *   addOil: (an action creator for ADD_OIL which takes only one argument)
 * }
 */
```

Using this helper makes it mandatory to always have action creators that accept **only one argument**. It also (obviously) generates actions implicitly. You might think this is a terrible idea, but here are some arguments in its favor:
- This provides a standard for action creation and usage of payloads throughout the app. Such a standard is usually missing in big projects, and this can lead to some highly time-consuming development hassles.
- You don't have to worry about how you defined your action creator. When using it, you know it will accept only one argument, and you'll be happy that you can just pass an object, or a primitive, and access it directly when you use the action somewhere else (in a reducer or in a saga).
- If the naming convention you chose for your action types is consistent and meaningful, you'll only need to check **one file** to figure out how your action creators work, how they're named, and what they do.
- Your logic is kept for the reducer and/or the saga to handle.
- Giving your actions a namespace is trivial.

