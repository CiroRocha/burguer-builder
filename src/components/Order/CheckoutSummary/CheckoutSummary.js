import React from 'react'

import styles from './checkoutSummary.module.css'

import Burguer from '../../Burguer/Burguer'
import Button from '../../UI/Button/Button'

const CheckoutSummary = ({ ingredients, checkoutCancel, checkoutContinue }) => {
  return (
    <div className={ styles.CheckoutSummary } >
      <h1>Nice choice! Ready to order?</h1>
      <div style={{ width: '100%', margin: 'auto' }} >
        <Burguer ingredients={ ingredients } />
      </div>
      <Button buttonType='Danger' clicked={ checkoutCancel } >Cancel</Button>
      <Button buttonType='Success' clicked={ checkoutContinue } >Continue</Button>
    </div>
  )
}

export default CheckoutSummary
