import React, { useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
import { navigate } from '@reach/router'

import axios from '../../components/axios-orders'

import useErrorHandler from '../../hoc/useErrorHandler/useErrorHandler'

import Burguer from '../../components/Burguer/Burguer'
import BuildControls from '../../components/Burguer/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

const BurguerContainer = () => {

  // This would be used if react router was in control of routing
  // let history = useHistory()

  const [ ingredients, setIngredients ] = useState(null)
  const [ errorScreen, setErrorScreen ] = useState(false)

  useEffect(() => {
    axios.get('https://burguer-app-ciro-rocha.firebaseio.com/ingredients.json')
      .then(response =>  setIngredients(response.data))
      .catch(error => setErrorScreen(true))
  }, [])

  const [ totalPrice, setTotalPrice ] = useState(4)
  const [ purchasable, setPurchasable ] = useState(false)
  const [ reviewOrder, setReviewOrder ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const updatePurchasableState = (updatedIngredients) => {
    const allIngredients = updatedIngredients

    const sum = Object.keys( allIngredients )
      .map(igKey => {
        return allIngredients[ igKey ]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)

    setPurchasable(sum > 0)
  }

  const addIngredientHandler = ( type ) => {
    const updatedIngredients = { ...ingredients }
    updatedIngredients[type] = ingredients[type] + 1
    setIngredients( updatedIngredients )
    setTotalPrice( totalPrice + INGREDIENT_PRICES[type] )
    updatePurchasableState(updatedIngredients)
  }

  const removeIngredientHandler = ( type ) => {
    const updatedIngredients = { ...ingredients }
    if (updatedIngredients[type] - 1 >= 0) {
      updatedIngredients[type] = ingredients[type] - 1
      setIngredients( updatedIngredients )
      setTotalPrice( totalPrice - INGREDIENT_PRICES[type] )
    }
    updatePurchasableState(updatedIngredients)
  }

  const purchaseConfirmation = () => {

    let queryString = ''

    queryString = Object.entries(ingredients).map( ingredient => {
      return queryString.concat(ingredient[0], '=', ingredient[1].toString())
    })

    queryString = queryString.join('&')
    queryString += `&price=${totalPrice.toFixed(2)}`

    navigate(`/checkout?${queryString}`);
  }

  const disabledInfo = { ...ingredients }
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }

  let orderSummary = null
  let burgerControls = errorScreen ? <p>Ingredients can't be loaded :(</p> : <Spinner />

  if( ingredients ) {
    orderSummary = <OrderSummary ingredients={ ingredients } confirmOrder={ () => purchaseConfirmation() } cancelOrder={ () => setReviewOrder(false) } totalPrice={ totalPrice } />
    burgerControls = (
      <>
        <Burguer ingredients={ ingredients } />
        <BuildControls
          ingredientAdded={ addIngredientHandler }
          ingredientRemoved={ removeIngredientHandler }
          price={ totalPrice }
          purchasable={ purchasable }
          disabled={ disabledInfo }
          reviewOrder={ () => setReviewOrder(true) }
        />
      </>
    )
  }

  if ( loading ) {
    orderSummary = <Spinner />
  }

  return (
    <>
      <Modal show={ reviewOrder } modalClosed={ () => setReviewOrder(false) } >
        { orderSummary }
      </Modal>
      { burgerControls }
    </>
  )
}

export default useErrorHandler(BurguerContainer, axios)