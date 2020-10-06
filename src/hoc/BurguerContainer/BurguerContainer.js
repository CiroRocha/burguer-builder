import React, { useState, useEffect } from 'react'

import { navigate } from '@reach/router'

import { useSelector } from 'react-redux'

import axios from '../../components/axios-orders'

import useErrorHandler from '../../hoc/useErrorHandler/useErrorHandler'

import Burguer from '../../components/Burguer/Burguer'
import BuildControls from '../../components/Burguer/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'

const BurguerContainer = () => {

  const ing = useSelector( state => state.burger.ingredients )
  const totalPrice = useSelector( state => state.burger.totalPrice )
  const errFetchIngredients = useSelector( state => state.burger.error )
  const authToken = useSelector( state => state.auth.token )

  const [ reviewOrder, setReviewOrder ] = useState(false)

  const [ sum, setSum ] = useState(0)

  // Checks if burger is purchasable based on the amount of ingredients picked
  useEffect (() => {
    if( ing ) {
      setSum (
        Object.keys( ing )
          .map(igKey => {
            return ing[ igKey ]
          })
          .reduce((sum, el) => {
            return sum + el
          }, 0)
        )
    }
  }, [ ing ])


  const handleReviewOrder = () => {
    if ( authToken ) {
      setReviewOrder(true)
    } else {
      localStorage.setItem( 'onCartBurger', JSON.stringify(ing) )
      localStorage.setItem( 'onCartBurgerPrice', totalPrice.toFixed(2) )
      navigate('/login')
    }
  }

  // Checks if there is more than 1 of each ingredient
  // The ones who don't get a disabled remove ingredient button
  const disabledInfo = { ...ing }
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }

  // Manages loading and error state while fetching from server
  let orderSummary = null
  let burgerControls = errFetchIngredients ? <p>Ingredients can't be loaded :(</p> : <Spinner />

  if ( ing ) {
    orderSummary = <OrderSummary cancelOrder={ () => setReviewOrder(false) } />
    burgerControls = (
      <>
        <BuildControls
          price={ totalPrice }
          disabled={ disabledInfo }
          reviewOrder={ () => handleReviewOrder() }
          btnText = { authToken ? 'Order now' : 'Sign in to order' }
          purchasableBurger = { sum <= 0 } // if no ingredient is added to the burger, disabled = true
        />
      </>
    )
  }

  return (
    <>
      <Modal show={ reviewOrder } modalClosed={ () => setReviewOrder(false) } >
        { orderSummary }
      </Modal>
      <Burguer />
      { burgerControls }
    </>
  )
}

export default useErrorHandler(BurguerContainer, axios)