import React, { useState } from 'react'
import axios from '../../../components/axios-orders'

import styles from './contactData.module.css'

import Button from '../../../components/UI/Button/Button'

const ContactData = ({ ingredients, totalPrice }) => {

  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ address, setAddress ] = useState({
    street: '',
    postalCode: '',
  })

  const orderHandler = (event) => {
    event.preventDefault()
    setLoading(true)
    axios.post('/orders-placed.json', {
      ingredients: ingredients,
      price: totalPrice.toFixed(2), // this would not happen in production, price should ALWAYS be calculated away from user side code
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
        // setReviewOrder(false)
      })
      .catch(error => {
        setLoading(false)
        // setReviewOrder(false)
      })
  }

  return (
    <div className={ styles.ContactData } >
      <h4>Enter your contact data:</h4>
      <form>
        <input type='text' name='name' placeholder='Your name' />
        <input type='email' name='email' placeholder='Your e-mail' />
        <input type='text' name='street' placeholder='Your street' />
        <input type='text' name='postal code' placeholder='Your postal code' />
        <Button buttonType='Success' clicked={ (e) => orderHandler(e) } >Order</Button>
      </form>
    </div>
  )
}

export default ContactData
