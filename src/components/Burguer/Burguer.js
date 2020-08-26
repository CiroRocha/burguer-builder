import React from 'react'

import { useSelector } from 'react-redux'

import styles from './burguer.module.css'

import BurguerIngredient from './BurguerIngredient/BurguerIngredient'

const Burguer = () => {

  const ing = useSelector( state => state.ingredients )

  let mountedIngredients = Object.keys(ing)
    .map(ingredient => {
      return(
        [...Array(ing[ingredient])].map((_, index) => {    // Array(x) creates an empty array with length 'x'; ingredients[ingredient] means the value paired with key 'ingredient' on object 'ingredients'
            return <BurguerIngredient key={ ingredient + index } type={ ingredient } />
          }
        )
      )
    })
    .reduce((arr, el) => {    //Reduces array by lopping the given array and stores the result inside the newly created 'arr', that receives '[]' as an initial value, since this is the second argument passed
      return arr.concat(el)
    }, [])

  if(mountedIngredients.length === 0) {
    mountedIngredients = <p>Start adding ingredients</p>
  }

  return (
    <div className={ styles.Burguer } >
      <BurguerIngredient type='bread-top' />
      { mountedIngredients }
      <BurguerIngredient type='bread-bottom' />
    </div>
  )
}

export default Burguer