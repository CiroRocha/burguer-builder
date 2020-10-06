import React, { useState, useEffect } from 'react'

import styles from './order.module.css'

const Order = ({ ingredients, price }) => {

  const [ allIngredients, setAllIngredients ] = useState([])

  useEffect(() => {
    const arrayOfIngredients = []

    for( let ingredient in ingredients ) {
      arrayOfIngredients.push(
        <span key={ ingredient } >{ ingredient }: { ingredients[ingredient] }</span>
      )
    }

    setAllIngredients(arrayOfIngredients)
  }, [ ingredients ])

  return (
    <div className={ styles.Order } >
      <p>Ingredients: { allIngredients }</p>
      <p>Price: <b>${ price }</b></p>
    </div>
  )
}

export default Order
