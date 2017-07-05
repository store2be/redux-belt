import jsc from 'jsverify'

export const makeCrudReducerBase = resourceGenerator => ({
  changes: jsc.dict(jsc.json),
  errors: jsc.array(errorEntry),
  filters: jsc.dict(jsc.asciistring),
  loading: jsc.record({
    single: jsc.bool,
    index: jsc.bool,
    update: jsc.bool,
    delete: jsc.bool,
    create: jsc.bool,
  }),
  index: jsc.array(resourceGenerator),
  metaData: jsc.record({
    page: jsc.nat,
  }),
  single: jsc.dict(resourceGenerator),
})

export const crudReducerBase = makeCrudReducerBase(jsc.dict(jsc.json))
export const crudReducerState = jsc.record(crudReducerBase)

/**
 * Generates quasi-compliant v4 UUIDs
 */
export const uuid = jsc.bless({
  generator: () =>
  'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    () => Math.floor(Math.random() * 16).toString(16)),
})

const errorEntry = jsc.record({
  target: jsc.asciinestring,
  message: jsc.string,
})

export const errorResponse = jsc.record({
  errors: jsc.array(errorEntry),
})

