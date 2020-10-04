import { combineReducers } from 'redux'

import authReducer from './stateReducers/authReducer'
import burgerReducer from './stateReducers/burgerReducer'
import orderReducer from './stateReducers/orderReducer'

export const globalReducer = combineReducers({
  burger: burgerReducer,
  order: orderReducer,
  auth: authReducer,
})