import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import axios from '../../../components/axios-orders'

import styles from './contactData.module.css'

import Button from '../../../components/UI/Button/Button'
import Input from '../../../components/UI/Input/Input'
import Spinner from '../../../components/UI/Spinner/Spinner'

const ContactData = ({ ingredients, totalPrice }) => {

  const [ displayForm, setDisplayForm ] = useState(null)

  const [ loading, setLoading ] = useState(false)

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
    setLoading(true)

    const formValues = {}
    for ( let elIdentifier in fieldsData ) {
      if(fieldsData[elIdentifier].validationRules(event.target[elIdentifier].value)) {
        formValues[elIdentifier] = event.target[elIdentifier].value
      } else {
        formValues[elIdentifier] = null
      }
    }

    const fieldValues = Object.values(formValues)

    for( let i = 0; i < fieldValues.length; i++) {
      if( fieldValues[i] === null ) {
        setLoading(false)
        return
      }
    }

    axios.post('/orders-placed.json', {
      ingredients: ingredients,
      price: totalPrice, // this would not happen in production, price should ALWAYS be calculated away from user side code
      costumerData: formValues
    }).then(response => {
        setLoading(false)
        navigate('/')
      })
      .catch(error => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if( loading ) {
      setDisplayForm(<Spinner />)
    } else {
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
  }, [loading])

  return (
    <div className={ styles.ContactData } >
      <h4>Enter your contact data:</h4>
      { displayForm }
    </div>
  )
}

export default ContactData
