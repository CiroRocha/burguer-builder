import React from 'react'

import Button from '../../UI/Button/Button'

const OrderSummary = ({ ingredients, confirmOrder, cancelOrder, totalPrice }) => {

  const ingredientSummary = Object.keys(ingredients)
    .map((igKey, index) => {
      return <li style={{ textTransform: 'capitalize' }} key={ index } >{ igKey }: { ingredients[igKey] }</li>
    })

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
      <Button buttonType='Success' clicked={ () => confirmOrder() } >Yes</Button>
    </>
  )
}

export default OrderSummary
