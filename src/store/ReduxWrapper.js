import React from 'react';
import { Provider, compose } from 'react-redux';
import { createStore as reduxCreateStore } from 'redux';
import burgerReducer from './reducers/reducer';

const createStore = () => reduxCreateStore(
  burgerReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose
);

export default ({ element }) => (
  <Provider store={createStore()}>{element}</Provider>
);