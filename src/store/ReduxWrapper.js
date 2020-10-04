import React from 'react'
import { Provider } from 'react-redux'
import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { globalReducer } from './reducers/globalReducer'

import * as authActions from './actions/asyncActions/authActions'

const createStore = reduxCreateStore( globalReducer, composeWithDevTools( applyMiddleware( thunk ) ) )

const dispatch = createStore.dispatch
dispatch( authActions.authCheckState() )

export const ReduxWrapper = ({ children }) => {
  return (
    <Provider store={createStore}>
      { children }
    </Provider>
  )
}