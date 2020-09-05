import * as actionTypes from '../actionTypes'

import axios from '../../../components/axios-orders'

export const purchaseBurguer = ( orderData ) => {
  return dispatch => {
    dispatch({ type: actionTypes.PURCHASE_BURGER_START })
    axios.post( '/orders-placed.json', orderData )
      .then(response => {
        dispatch({ type: actionTypes.PURCHASE_BURGER_SUCCESS, response: response, orderData })
      })
      .catch(error => {
        dispatch({ type: actionTypes.PURCHASE_BURGER_FAILURE, error: error })
      })
  }
}