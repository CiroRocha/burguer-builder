import React from 'react'

import styles from './buildControl.module.css'

const BuildControl = ({ labelText, added, removed, disabledButton }) => {
  return (
    <div className={ styles.BuildControl } >
      <div className={ styles.Label } >{ labelText }</div>
      <button className={ styles.Less } onClick={ removed } disabled={ disabledButton } >-</button>
      <button className={ styles.More } onClick={ added } >+</button>
    </div>
  )
}

export default BuildControl