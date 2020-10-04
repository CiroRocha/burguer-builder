import React from 'react'
import { navigate } from '@reach/router'
import { useSelector, useDispatch } from 'react-redux'
import * as authActions from '../../../store/actions/asyncActions/authActions'

import styles from './checkoutSummary.module.css'

import Burguer from '../../Burguer/Burguer'
import Button from '../../UI/Button/Button'

const CheckoutSummary = () => {

  const authToken = useSelector( state => state.auth.token )

  const dispatch = useDispatch()

  return (
    <div className={ styles.CheckoutSummary } >
      <h1>Nice choice! Ready to order?</h1>
      <div style={{ width: '100%', margin: 'auto' }} >
        <Burguer />
      </div>
      <Button buttonType='Danger' clicked={ () => navigate(-1) } >Cancel</Button>
      <Button buttonType='Success' clicked={ () => {
        if ( authToken ) {
          navigate('/checkout/contact-data')
        } else {
          dispatch( authActions.setRedirectPath('/checkout') )
          navigate('/login')
        }
      }} >Continue</Button>
    </div>
  )
}

export default CheckoutSummary
