import * as actionTypes from '../actionTypes'

import axios from '../../../components/axios-orders'

export const initIngredients = () => {
  return dispatch => {

    const onCartBurger = JSON.parse(localStorage.getItem('onCartBurger'))

    console.log(onCartBurger);
    if( onCartBurger ) {
      console.log('received local storage ingredients');
      return dispatch({ type: actionTypes.SET_INGREDIENTS, ingredients: onCartBurger })
    }

    console.log('server ingredients');
    axios.get( 'https://burguer-app-ciro-rocha.firebaseio.com/ingredients.json' )
      .then (response => {
        dispatch({ type: actionTypes.SET_INGREDIENTS, ingredients: response.data })
      })
      .catch(err => {
        dispatch({ type: actionTypes.FETCH_INGREDIENTS_FAIL })
      })
  }
}