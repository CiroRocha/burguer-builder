import React from 'react'
import { navigate } from '@reach/router'

import { useSelector } from 'react-redux'

import Button from '../../UI/Button/Button'

const OrderSummary = ({ cancelOrder }) => {

  const ing = useSelector( state => state.burger.ingredients )
  const totalPrice = useSelector( state => state.burger.totalPrice )

  const ingredientSummary = Object.keys(ing)
    .map((igKey, index) => {
      return <li style={{ textTransform: 'capitalize' }} key={ index } >{ igKey }: { ing[igKey] }</li>
    })

  const goToCheckout = () => {
    console.log(ing);
    localStorage.setItem( 'onCartBurger', JSON.stringify(ing) )
    localStorage.setItem( 'onCartBurgerPrice', totalPrice.toFixed(2) )
    console.log(localStorage);
    navigate('/checkout')
  }

  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        { ingredientSummary }
      </ul>
      <p>Total price: <b>{ totalPrice.toFixed(2) }</b></p>
      <p>Proceed to checkout?</p>
      <Button buttonType='Danger' clicked={ () => cancelOrder() } >No</Button>
      <Button buttonType='Success' clicked={ () => goToCheckout() } >Yes</Button>
    </>
  )
}

export default OrderSummary
