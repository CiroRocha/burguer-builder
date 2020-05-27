import React from 'react'

import styles from './burguer.module.css'

import BurguerIngredient from './BurguerIngredient/BurguerIngredient'

const Burguer = () => {
  return (
    <>
    <p>test</p>
    <div className={ styles.Burguer } >
      <BurguerIngredient type='bread-top' />
      <BurguerIngredient type='salad' />
      <BurguerIngredient type='cheese' />
      <BurguerIngredient type='meat' />
      <BurguerIngredient type='bread-bottom' />
    </div>
    </>
  )
}

export default Burguer