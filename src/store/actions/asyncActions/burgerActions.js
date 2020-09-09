import * as actionTypes from '../actionTypes'

import axios from '../../../components/axios-orders'

export const initIngredients = () => {
  return dispatch => {

    const onCartBurger = JSON.parse(localStorage.getItem('onCartBurger'))

    if( onCartBurger ) {
      return dispatch({ type: actionTypes.SET_INGREDIENTS, ingredients: onCartBurger })
    }

    axios.get( 'https://burguer-app-ciro-rocha.firebaseio.com/ingredients.json' )
      .then (response => {
        dispatch({ type: actionTypes.SET_INGREDIENTS, ingredients: response.data })
      })
      .catch(err => {
        dispatch({ type: actionTypes.FETCH_INGREDIENTS_FAIL })
      })
  }
}