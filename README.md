# redux-belt

[![Build Status](https://travis-ci.org/store2be/redux-belt.svg?branch=master)](https://travis-ci.org/store2be/redux-belt)
[![codecov](https://codecov.io/gh/store2be/redux-belt/branch/master/graph/badge.svg)](https://codecov.io/gh/store2be/redux-belt)

This library provides several highly opinionated helpers which ought to be useful while developing big apps with React, Redux and Sagas. These helpers ensure the keeping of best practices and their main goal is to reduce the amount of boilerplate introduced by Redux code, while avoiding conflict with Redux design decisions.

**redux-belt uses semantic versioning. So until 1.0.0 is reached expect many breaking changes.**

Here are the design-defining constraints that `redux-belt` introduces:
- Redux action creators should contain no logic. This would not work with `redux-thunk`, but we're using `redux-saga` here. Your application's logic should be handled by the structure of the actions themselves, or by the final consumers of an action's payload.
- When using an action creator, the generated action's payload should stay untouched from the moment it is created, until it reaches its destination within the app (for example when it's used in an API call, or when it's used in a reducer).
- Action types, namespacing and action creators should all be given consistent names, and this name should only be defined in one place.

You can find [a comparison with similar existing projects in our wiki](https://github.com/store2be/redux-belt/wiki/Comparison-to-similar-projects).
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

## Wiki
- [actionsNamespace](https://github.com/store2be/redux-belt/wiki/actionsNamespace): generates action creators and action types.
- [crudActionsNamespace](https://github.com/store2be/redux-belt/wiki/crudActionsNamespace): removes reducer boilerplate for common CRUD functionality.
- [simpleAsync](https://github.com/store2be/redux-belt/wiki/simpleAsync): side-effects with redux-saga.
- [utils](https://github.com/store2be/redux-belt/wiki/utils): utilities like `strict` to catch undefined action types in development
