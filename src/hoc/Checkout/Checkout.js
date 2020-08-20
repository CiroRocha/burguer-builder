import React, { useState, useEffect } from 'react'
import { navigate, useLocation, Router } from '@reach/router'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

const Checkout = () => {

  const location = useLocation()

  const [ ingredients, setIngredients ] = useState({
    salad: 0,
    meat: 0,
    cheese: 0,
    bacon: 0,
  })

  const [ price, setPrice ] = useState(0)

  useEffect(() => {
    console.log(location);
    const query = new URLSearchParams(location.search)
    const queryIngredients = {}

    for(let param of query.entries()) {
      if (param[0] === 'price') {
        setPrice(param[1])
      } else {
        queryIngredients[param[0]] = +param[1]
      }
    }

    setIngredients(queryIngredients)
  }, [])

  const CheckoutCancelHandler = () => {
    navigate(-1)
  }

  const CheckoutContinueHandler = () => {
    navigate('/checkout/contact-data')
  }

  return (
    <div>
      <CheckoutSummary ingredients={ ingredients } checkoutCancel={ CheckoutCancelHandler } checkoutContinue= { CheckoutContinueHandler } />
      <Router>
        <ContactData path={ 'checkout/contact-data' } ingredients={ ingredients } price={ price } />
      </Router>
    </div>
  )
}

export default Checkout
