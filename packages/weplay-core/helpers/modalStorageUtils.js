import * as R from 'ramda'

const MODALS_STORAGE_KEY = 'modalsViewed'

const getModalsViewed = globalScope => JSON.parse(globalScope.localStorage.getItem(MODALS_STORAGE_KEY)) || {}

export const getModalViewedStatus = (globalScope, modalName) => R.pipe(
  getModalsViewed,
  R.prop(modalName),
  Boolean,
)(globalScope)

export const setModalViewedStatus = (globalScope, modalName) => {
  const modalsViewed = getModalsViewed(globalScope)
  modalsViewed[modalName] = true

  globalScope.localStorage.setItem(MODALS_STORAGE_KEY, JSON.stringify(modalsViewed))
}
