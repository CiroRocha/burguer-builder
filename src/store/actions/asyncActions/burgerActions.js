import * as actionTypes from '../actionTypes'

import { useDispatch } from 'react-redux'
import axios from '../../../components/axios-orders'

export const initIngredients = () => {
  return dispatch => {
    axios.get( 'https://burguer-app-ciro-rocha.firebaseio.com/ingredients.json' )
      .then (response => {
        dispatch({ type: actionTypes.SET_INGREDIENTS, ingredients: response.data })
      })
      .catch(err => {
        dispatch({ type: actionTypes.FETCH_INGREDIENTS_FAIL })
      })
  }
}