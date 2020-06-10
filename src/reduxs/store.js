// INFO: Using Only For DEV
/* eslint-disable */
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'

import combinedReducers from './createReducer'

export default (axios, initialState) => {
  const middlewares = [
    thunk.withExtraArgument(axios),
  ]

  const enhancers = [
    applyMiddleware(...middlewares),
  ]

  const store = createStore(combinedReducers, initialState, composeWithDevTools(
    compose(...enhancers),
  ))

  const persistor = persistStore(store)


  // const store = createStore(
  //   combinedReducers,
  //   initialState,
  //   compose(...enhancers),
  // )
  return { persistor, store }
}
