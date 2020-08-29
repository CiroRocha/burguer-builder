import React from 'react'

import { useDispatch } from 'react-redux'
import * as actionTypes from '../../../store/actions/actionTypes'

import styles from './buildControls.module.css'

import BuildControl from './BuildControl/BuildControl'

const BuildControls = ({ price, purchasable, disabled, reviewOrder }) => {

  const dispatch = useDispatch()

  const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
  ]

  return (
    <div className={ styles.BuildControls } >
      <p>Burguer price: <b>{ price.toFixed(2) }</b></p>
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
        className={ styles.OrderButton } disabled={ !purchasable }
        onClick={ () => reviewOrder() }
      >Order now</button>
    </div>
  )
}

export default BuildControls