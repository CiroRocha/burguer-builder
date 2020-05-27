import React from 'react'

import styles from './BuildControls.module.css'

import BuildControl from './BuildControl/BuildControl'

const BuildControls = ({ ingredientAdded, ingredientRemoved, disabled }) => {

  const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
  ]

  return (
    <div className={ styles.BuildControls } >
      {controls.map(control => {
        return <BuildControl
                  labelText={ control.label }
                  key={ control.label }
                  added={ () => ingredientAdded(control.type) }
                  removed={ () => ingredientRemoved(control.type) }
                  disabledButton={ disabled[control.type] }
                />
      })}
    </div>
  )
}

export default BuildControls