import * as burgerActions from '../actions'

const initialState ={
  ingredients: {
    salad: 1,
    bacon: 0,
    meat: 1,
    cheese: 0,
  },
  totalPrice: 4
}

const reducer = ( state = initialState, action ) => {
  switch (action.type) {
    case burgerActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [ action.ingredientName ]: state.ingredients[ action.ingredientName ] + 1
        }
      }

    case burgerActions.REMOVE_INGREDIENT:
      let newValue = 0
      if ( state.ingredients[ action.ingredientName ] - 1 > 0 ) {
        newValue = state.ingredients[ action.ingredientName ] - 1
      }
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [ action.ingredientName ]: newValue
        }
      }

    default: return state
  }
}

export default reducer