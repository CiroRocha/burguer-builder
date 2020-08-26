import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'

import { connect } from 'redux'
import { useSelector } from 'react-redux'
import * as reduxActions from '../../store/actions'

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

  const ing = useSelector( state => state.ingredients )
  const totalPrice = useSelector( state => state.totalPrice )

  const [ errorScreen, setErrorScreen ] = useState(false)

  const [ reviewOrder, setReviewOrder ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  // BuildControls button disable/enable
  // Managed here and passed as prop so that Redux isn't necessary at BuildControls component
  const [ purchasable, setPurchasable ] = useState(false)
  useEffect(() => {
    const allIngredients = ing

    const sum = Object.keys( allIngredients )
      .map(igKey => {
        return allIngredients[ igKey ]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)

    setPurchasable(sum > 0)

  }, ing)

  // Send user to checkout page
  const purchaseConfirmation = () => {

    let queryString = ''

    queryString = Object.entries(ing).map( ingredient => {
      return queryString.concat(ingredient[0], '=', ingredient[1].toString())
    })

    queryString = queryString.join('&')
    queryString += `&price=${totalPrice.toFixed(2)}`

    navigate(`/checkout?${queryString}`);
  }

  // Checks if there is more than 1 of each ingredient
  // The ones who don't get a disabled remove ingredient button
  const disabledInfo = { ...ing }
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }

  // Manages loading and error state while fetching from server
  let orderSummary = null
  let burgerControls = errorScreen ? <p>Ingredients can't be loaded :(</p> : <Spinner />

  if( ing ) {
    orderSummary = <OrderSummary ingredients={ ing } confirmOrder={ () => purchaseConfirmation() } cancelOrder={ () => setReviewOrder(false) } totalPrice={ totalPrice } />
    burgerControls = (
      <>
        <Burguer ingredients={ ing } />
        <BuildControls
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