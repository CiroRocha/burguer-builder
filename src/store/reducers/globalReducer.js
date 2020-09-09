import { combineReducers } from 'redux'

import burgerReducer from './stateReducers/burgerReducer'
import orderReducer from './stateReducers/orderReducer'

export const globalReducer = combineReducers({ burger: burgerReducer, order: orderReducer })