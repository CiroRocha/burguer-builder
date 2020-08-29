import React from 'react'
import { Provider } from 'react-redux'
import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { globalReducer } from './reducers/globalReducer'

const createStore = () => {
  return (
    reduxCreateStore(
      globalReducer,
      composeWithDevTools(
        applyMiddleware( thunk )
      )
    )
  )
}

export default ({ element }) => (
  <Provider store={createStore()}>{element}</Provider>
);