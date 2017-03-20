import { actionCreator, snakeCaseToCamel } from './utils'

export default function actionsNamespace(prefix, baseActionTypes) {
  if (!(baseActionTypes instanceof Array)) {
    throw new Error('Please supply an array of actions as strings as a second argument')
  }

  const actions = {}
  const types = {}

  for (let i = 0; i < baseActionTypes.length; i += 1) {
    const actionType = baseActionTypes[i]
    types[actionType] = `${prefix}/${actionType}`
    types[`${actionType}_SUCCESS`] = `${prefix}/${actionType}_SUCCESS`
    types[`${actionType}_FAILURE`] = `${prefix}/${actionType}_FAILURE`

    const camelCaseActionType = snakeCaseToCamel(actionType)
    actions[camelCaseActionType] = actionCreator(types[actionType])
  }

  return { types, actions }
}
