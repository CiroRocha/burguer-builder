import React, { useState, useEffect } from 'react'

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

  const [ reviewOrder, setReviewOrder ] = useState(false)

  // BuildControls order button disable/enable
  // Managed here and passed as prop so that Redux isn't necessary at BuildControls component
  const [ purchasable, setPurchasable ] = useState(false)

  // Checks if burger is purchasable based on the amount of ingredients picked
  useEffect (() => {
    if( ing ) {
      const sum = Object.keys( ing )
        .map(igKey => {
          return ing[ igKey ]
        })
        .reduce((sum, el) => {
          return sum + el
        }, 0)

      setPurchasable(sum > 0)
    }
  }, [ ing ])


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
          purchasable={ purchasable }
          disabled={ disabledInfo }
          reviewOrder={ () => setReviewOrder(true) }
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