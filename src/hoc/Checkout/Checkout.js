import React from 'react'
import { Router } from '@reach/router'

import { useSelector } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

const Checkout = () => {

  const ing = useSelector( state => state.ingredients )
  const totalPrice = useSelector( state => state.totalPrice )

  return (
    <div>
      <CheckoutSummary ingredients={ ing } />
      <Router>
        <ContactData path={ 'checkout/contact-data' } ingredients={ ing } totalPrice={ totalPrice } />
      </Router>
    </div>
  )
}

export default Checkout
