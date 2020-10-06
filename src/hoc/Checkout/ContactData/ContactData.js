import React, { useState, useEffect } from 'react'
import axios from '../../../components/axios-orders'

import { useSelector, useDispatch } from 'react-redux'
import * as orderActions from '../../../store/actions/asyncActions/orderActions'
import * as authActions from '../../../store/actions/asyncActions/authActions'

import styles from './contactData.module.css'

import Button from '../../../components/UI/Button/Button'
import Input from '../../../components/UI/Input/Input'
import Spinner from '../../../components/UI/Spinner/Spinner'

import useErrorHandler from '../../useErrorHandler/useErrorHandler'
import { navigate } from 'gatsby'

const ContactData = () => {

  const dispatch = useDispatch()

  const [ displayForm, setDisplayForm ] = useState(null)

  const ing = useSelector( state => state.burger.ingredients )
  const totalPrice = useSelector( state => state.burger.totalPrice )
  const loading = useSelector( state => state.order.purchasingBurger )
  const token = useSelector( state => state.auth.token )
  const userId = useSelector( state => state.auth.userId )

  // eslint-disable-next-line no-unused-vars
  const [ fieldsData, setFieldsData ] = useState({
    name: {
      elementType: 'input',
      defaultValue: '',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name',
      },
      validationRules: (
        function (value) {
          if(value !== '' && value.length >= 3) {
            return true
          } else {
            return false
          }
        }
      )
    },
    email: {
      elementType: 'input',
      defaultValue: '',
      elementConfig: {
        type: 'email',
        placeholder: 'Your e-mail',
      },
      validationRules: (
        function (value) {
          if(value !== '' && value.length >= 3) {
            return true
          } else {
            return false
          }
        }
      )
    },
    street: {
      elementType: 'input',
      defaultValue: '',
      elementConfig: {
        type: 'text',
        placeholder: 'Your street',
      },
      validationRules: (
        function (value) {
          if(value !== '' && value.length >= 3) {
            return true
          } else {
            return false
          }
        }
      )
    },
    streetNumber: {
      elementType: 'input',
      defaultValue: '',
      elementConfig: {
        type: 'text',
        placeholder: 'Your streetNumber',
      },
      validationRules: (
        function (value) {
          if(value !== '' && value.length >= 3) {
            return true
          } else {
            return false
          }
        }
      )
    },
    postalCode: {
      elementType: 'input',
      defaultValue: '',
      elementConfig: {
        type: 'text',
        placeholder: 'Your postal code',
      },
      validationRules: (
        function (value) {
          if(value !== '' && value.length >= 3) {
            return true
          } else {
            return false
          }
        }
      )
    },
    deliveryMethod: {
      elementType: 'select',
      defaultValue: '',
      elementConfig: {
        options: [
          { value: 'Pickup', displayValue: 'Pick up at store' },
          { value: 'Delivery', displayValue: 'Delivery to your home' },
        ]
      },
      validationRules: (
        function () {
          return true
        }
      )
    },
  })

  const orderHandler = (event) => {
    event.preventDefault()

    const formValues = {}
    for ( let elIdentifier in fieldsData ) {
      if(fieldsData[elIdentifier].validationRules(event.target[elIdentifier].value)) {
        formValues[elIdentifier] = event.target[elIdentifier].value
      } else {
        formValues[elIdentifier] = null
      }
    }

    const orderData = {
      ingredients: ing,
      price: totalPrice, // this would not happen in production, price should ALWAYS be calculated away from user side code
      userId: userId,
      costumerData: formValues
    }

    dispatch( orderActions.purchaseBurger( orderData, token ) )
  }

  useEffect(() => {
    if( loading ) {
      setDisplayForm(<Spinner />)
    } else {

      if ( !token ) {
        setDisplayForm(
          <>
            <p>Please log in before ordering</p>
            <Button buttonType='Success' clicked={ () => {
                dispatch( authActions.setRedirectPath('/checkout/contact-data') )
                navigate('/login')
              }}
            >Login</Button>
          </>
        )
        return
      }

      const formArray = []
      for ( let key in fieldsData ) {
        formArray.push({
          id: key,
          config: fieldsData[key],
        })
      }
      setDisplayForm(
        <form onSubmit={ (event) => orderHandler(event) } >
          { formArray.map( formEl => {
            return <Input
                      label={ formEl.id }
                      key={ formEl.id }
                      elementName={ formEl.id }
                      elementType={ formEl.config.elementType }
                      elementConfig={ formEl.config.elementConfig }
                      value={ formEl.config.defaultValue }
                      validationRules={ formEl.config.validationRules }
                    />
          }) }
          <Button buttonType='Success' type='submit' >Order</Button>
        </form>
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ loading, fieldsData, ing, token ])

  return (
    <div className={ styles.ContactData } >
      { token ? <h4>Enter your contact data:</h4> : <h4>Sorry, you are not logged in :(</h4> }
      { displayForm }
    </div>
  )
}

export default useErrorHandler(ContactData, axios)
