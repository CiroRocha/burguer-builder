import React from 'react'

import styles from './backdrop.module.css'

const Backdrop = ({ show, onClickFunction }) => {
  return (
    show ?
      <div className={ styles.Backdrop } onClick={ onClickFunction } />
    :
      null
  )
}

export default Backdrop
