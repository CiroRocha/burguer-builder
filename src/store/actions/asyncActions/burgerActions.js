import * as actionTypes from '../actionTypes'

import axios from '../../../components/axios-orders'

export const initIngredients = ( forceIngredients ) => {
  return dispatch => {

    console.log(forceIngredients);
    if( forceIngredients ) {
      console.log('received local storage ingredients');
      return dispatch({ type: actionTypes.SET_INGREDIENTS, ingredients: forceIngredients })
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