# redux-belt

[![Build Status](https://travis-ci.org/store2be/redux-belt.svg?branch=master)](https://travis-ci.org/store2be/redux-belt)
[![codecov](https://codecov.io/gh/store2be/redux-belt/branch/master/graph/badge.svg)](https://codecov.io/gh/store2be/redux-belt)
[![Code Climate](https://codeclimate.com/github/store2be/redux-belt.svg)](https://codeclimate.com/github/store2be/redux-belt)
[![Inline docs](http://inch-ci.org/github/store2be/redux-belt.svg?branch=add-inch-ci)](http://inch-ci.org/github/store2be/redux-belt)
[![npm version](https://img.shields.io/npm/v/redux-belt.svg?style=flat-square)](https://www.npmjs.com/package/redux-belt)
[![npm version](https://img.shields.io/npm/dm/redux-belt.svg?style=flat-square)](https://www.npmjs.com/package/redux-belt)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/store2be/redux-belt/blob/master/CONTRIBUTING.md)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/store2be/redux-belt/blob/master/LICENSE)


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
- [actionsIncludingCrud](https://github.com/store2be/redux-belt/wiki/actionsIncludingCrud): removes reducer boilerplate for common CRUD functionality.
- [actions](https://github.com/store2be/redux-belt/wiki/actions): generates action creators and action types.
- [configureCrudReducer](https://github.com/store2be/redux-belt/wiki/configureCrudReducer): make your own `crudReducer` that plays nice with your back-end API.
- [crudReducer](https://github.com/store2be/redux-belt/wiki/crudReducer): a sane default reducer to help you build CRUD applications.
- [simpleAsync](https://github.com/store2be/redux-belt/wiki/simpleAsync): side-effects with redux-saga.
- [utils](https://github.com/store2be/redux-belt/wiki/utils): utilities like `strict` to catch undefined action types in development.
