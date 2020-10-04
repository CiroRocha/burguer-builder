import * as actionTypes from '../../actions/actionTypes'

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
}

const reducer = ( state = initialState, action ) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [ action.ingredientName ]: state.ingredients[ action.ingredientName ] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[ action.ingredientName ],
      }

    case actionTypes.REMOVE_INGREDIENT:
      let newValue = 0
      let newPrice = state.totalPrice
      if ( state.ingredients[ action.ingredientName ] - 1 >= 0 ) {
        newValue = state.ingredients[ action.ingredientName ] - 1
        newPrice = newPrice - INGREDIENT_PRICES[ action.ingredientName ]
      }
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [ action.ingredientName ]: newValue
        },
        totalPrice: newPrice,
      }

    case actionTypes.SET_INGREDIENTS:

      const ingredientsReceived = Object.entries(action.ingredients)
      let setPrice = 4
      ingredientsReceived.map( ing => {
        return setPrice = setPrice + INGREDIENT_PRICES[ing[0]] * ing[1]
      } )

      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: setPrice,
        error: false,
      }

    case actionTypes.CLEAR_INGREDIENTS:

      localStorage.removeItem('onCartBurger')
      localStorage.removeItem('onCartBurgerPrice')
      const allIngredients = state.ingredients
      const ingNames = Object.getOwnPropertyNames(allIngredients)
      for( let i = 0; i < ingNames.length; i++ ) {
        allIngredients[ingNames[i]] = 0
      }

      return {
        ...state,
        ingredients: allIngredients,
        totalPrice: 4,
        error: false,
      }

    case actionTypes.FETCH_INGREDIENTS_FAIL:
      return {
        ...state,
        error: true,
      }

    default: return state
  }
}

export default reducer