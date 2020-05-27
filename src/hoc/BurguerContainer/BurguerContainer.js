import React, { useState } from 'react'

import Burguer from '../../components/Burguer/Burguer'
import BuildControls from '../../components/Burguer/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

const BurguerContainer = () => {

  const [ ingredients, setIngredients ] = useState({
    salad: 0,
    cheese: 0,
    meat: 0,
    bacon: 0,
  })

  const [ totalPrice, setTotalPrice ] = useState(4)

  const addIngredientHandler = ( type ) => {
    const updatedIngredients = { ...ingredients }
    updatedIngredients[type] = ingredients[type] + 1
    setIngredients( updatedIngredients )
    setTotalPrice( totalPrice + INGREDIENT_PRICES[type] )
  }

  const removeIngredientHandler = ( type ) => {
    const updatedIngredients = { ...ingredients }
    if (updatedIngredients[type] - 1 >= 0) {
      updatedIngredients[type] = ingredients[type] - 1
      setIngredients( updatedIngredients )
      setTotalPrice( totalPrice - INGREDIENT_PRICES[type] )
    }
  }

  console.log('rerender');
  const disabledInfo = { ...ingredients }
  for (let key in disabledInfo) {
    // console.log(disabledInfo);
    disabledInfo[key] = disabledInfo[key] <= 0
  }

  return (
    <>
      <Burguer ingredients={ ingredients } />
      <BuildControls
        ingredientAdded={ addIngredientHandler }
        ingredientRemoved={ removeIngredientHandler }
        disabled={ disabledInfo }
      />
    </>
  )
}

export default BurguerContainer