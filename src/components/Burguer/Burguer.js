import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import * as burgerActions from '../../store/actions/asyncActions/burgerActions'

import styles from './burguer.module.css'

import BurguerIngredient from './BurguerIngredient/BurguerIngredient'

const Burger = () => {

  const ing = useSelector( state => state.burger.ingredients )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch( burgerActions.initIngredients() )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let mountedIngredients = []
  if(ing) {
    mountedIngredients = Object.keys(ing)
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
  }

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

export default Burger