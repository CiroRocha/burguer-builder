import React from 'react'
import { Router } from '@reach/router'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

const Checkout = () => {
  return (
    <div>
      <CheckoutSummary />
      <Router>
        <ContactData path={ 'checkout/contact-data' } />
      </Router>
    </div>
  )
}

export default Checkout
