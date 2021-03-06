import { actionCreator, snakeCaseToCamel } from './utils'

export default function actions(prefix, baseActionTypes) {
  if (!(baseActionTypes instanceof Array)) {
    throw new Error('Please supply an array of actions as strings as a second argument')
  }

  const actionCreators = {}
  const types = {}

  for (let i = 0; i < baseActionTypes.length; i += 1) {
    const actionType = baseActionTypes[i]
    const successType = `${prefix}/${actionType}_SUCCESS`
    const failureType = `${prefix}/${actionType}_FAILURE`

    types[actionType] = `${prefix}/${actionType}`
    types[`${actionType}_SUCCESS`] = successType
    types[`${actionType}_FAILURE`] = failureType

    const camelCaseActionType = snakeCaseToCamel(actionType)
    actionCreators[camelCaseActionType] = actionCreator(
      types[actionType],
      { successType, failureType },
    )
  }

  return { ...types, ...actionCreators }
}
