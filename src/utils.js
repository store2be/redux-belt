export function action(type, payload, meta) {
  return { type, payload, meta }
}

export function actionCreator(actionType, defaultMeta) {
  return (payload, meta) => action(actionType, payload, { ...defaultMeta, ...meta })
}

export function snakeCaseToCamel(actionType) {
  return actionType.toLowerCase().replace(/_[a-z0-9]/g, match => match[1].toUpperCase())
}

/**
 * This is a combinator that works with makeSimpleAsync. It takes an action
 * creator and returns the same action creator but with a refresh field added
 * to action.meta. This will cause makeSimpleAsync to bypass the shouldRun
 * checks.
 */
export function refresh(actionCreatorFunction) {
  return (payload) => {
    const innerAction = actionCreatorFunction(payload)
    const meta = { ...innerAction.meta, refresh: true }
    return { ...innerAction, meta }
  }
}

export function identity(argument) { return argument }

export function noop() {}
