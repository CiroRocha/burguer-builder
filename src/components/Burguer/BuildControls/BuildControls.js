import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import * as actionTypes from '../../../store/actions/actionTypes'

import styles from './buildControls.module.css'

import BuildControl from './BuildControl/BuildControl'

const BuildControls = ({ price, disabled, reviewOrder, btnText, purchasableBurger }) => {

  const dispatch = useDispatch()

  const ing = useSelector( state => state.burger.ingredients )

  const controls = Object.keys(ing).map(ingredientName => {
    return { label: ingredientName, type: ingredientName }
  })

  return (
    <div className={ styles.BuildControls } >
      <p>Burger price: <b>{ price.toFixed(2) }</b></p>
      {controls.map(control => {
        return <BuildControl
                  labelText={ control.label }
                  key={ control.label }
                  added={ () => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: control.type }) }
                  removed={ () => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: control.type }) }
                  disabledButton={ disabled[control.type] }
                />
      })}
      <button
        disabled={ purchasableBurger }
        className={ styles.OrderButton }
        onClick={ () => reviewOrder() }
      >{ btnText }</button>
      <button onClick={ () => dispatch({ type: actionTypes.CLEAR_INGREDIENTS }) } style={{ marginTop: '1rem', marginBottom: '3rem', backgroundColor: 'transparent', border: '0' }} >Clear basket</button>
    </div>
  )
}

export default BuildControls