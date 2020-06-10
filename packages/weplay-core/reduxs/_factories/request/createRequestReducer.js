import { handleActions } from 'redux-actions'

const generalInitialState = { loading: false, data: null, error: null }

const requestActionHandler = (state => ({
  ...state,
  loading: true,
  error: null,
}))
const successActionHandler = (state, action) => ({
  data: action.payload,
  loading: false,
  error: null,
})
const failActionHandler = (state, action) => ({
  ...state,
  loading: false,
  error: action.payload,
})

// TODO: here should be also CRUD reducer for collections, this reducer for singleton
export const createRequestReducer = (asyncAction, otherActions, initialState = generalInitialState) => handleActions({
  [asyncAction.REQUEST]: requestActionHandler,
  [asyncAction.SUCCESS]: successActionHandler,
  [asyncAction.ERROR]: failActionHandler,
  [asyncAction.CLEAR]: () => ({ ...initialState }),
  ...otherActions,
}, initialState)
