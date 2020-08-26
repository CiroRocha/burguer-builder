import React from 'react'
import { navigate } from '@reach/router'

import styles from './checkoutSummary.module.css'

import Burguer from '../../Burguer/Burguer'
import Button from '../../UI/Button/Button'

const CheckoutSummary = ({ ingredients }) => {
  return (
    <div className={ styles.CheckoutSummary } >
      <h1>Nice choice! Ready to order?</h1>
      <div style={{ width: '100%', margin: 'auto' }} >
        <Burguer ingredients={ ingredients } />
      </div>
      <Button buttonType='Danger' clicked={ () => navigate(-1) } >Cancel</Button>
      <Button buttonType='Success' clicked={ () => navigate('/checkout/contact-data') } >Continue</Button>
    </div>
  )
}

export default CheckoutSummary
