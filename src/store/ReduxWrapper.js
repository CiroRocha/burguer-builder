import React from 'react';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore } from 'redux';
import burgerReducer from './reducers/reducer';

const createStore = () => reduxCreateStore(burgerReducer);

export default ({ element }) => (
  <Provider store={createStore()}>{element}</Provider>
);