import createAction from 'redux-actions/es/createAction'

const SET_BACKOFFICE_CONTENT = 'SET_BACKOFFICE_CONTENT'
const CLEAR_BACKOFFICE_CONTENT = 'CLEAR_BACKOFFICE_CONTENT'

export const setBackofficeContent = createAction(SET_BACKOFFICE_CONTENT)
export const clearBackofficeContent = createAction(CLEAR_BACKOFFICE_CONTENT)
