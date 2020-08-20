import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import axios from '../../../components/axios-orders'

import styles from './contactData.module.css'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'

const ContactData = ({ ingredients, totalPrice }) => {

  const [ displayForm, setDisplayForm ] = useState(
    <form>
      <input type='text' name='name' placeholder='Your name' />
      <input type='email' name='email' placeholder='Your e-mail' />
      <input type='text' name='street' placeholder='Your street' />
      <input type='text' name='postal code' placeholder='Your postal code' />
      <Button buttonType='Success' type='submit' clicked={ (e) => orderHandler(e) } >Order</Button>
    </form>
  )

  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ address, setAddress ] = useState({
    street: '',
    postalCode: '',
  })

  useEffect(() => {
    if( loading ) {
      setDisplayForm(<Spinner />)
    } else {
      setDisplayForm(
        <form>
          <input type='text' name='name' placeholder='Your name' />
          <input type='email' name='email' placeholder='Your e-mail' />
          <input type='text' name='street' placeholder='Your street' />
          <input type='text' name='postal code' placeholder='Your postal code' />
          <Button buttonType='Success' type='submit' clicked={ (e) => orderHandler(e) } >Order</Button>
        </form>
      )
    }
  }, [loading])

  const orderHandler = (event) => {
    event.preventDefault()
    setLoading(true)
    axios.post('/orders-placed.json', {
      ingredients: ingredients,
      price: totalPrice, // this would not happen in production, price should ALWAYS be calculated away from user side code
      costumer: {
        name: 'Joe Costumer',
        contact: 'joe@mailservice.com',
        deliveryMethod: 'PickUp',
        address: {
          street: "Joe's street",
          zipCode: '12.345-67',
          number: '13'
        }
      }
    }).then(response => {
        setLoading(false)
        navigate('/')
      })
      .catch(error => {
        setLoading(false)
      })
  }

  return (
    <div className={ styles.ContactData } >
      <h4>Enter your contact data:</h4>
      { displayForm }
    </div>
  )
}

export default ContactData
