import React from 'react'

import styles from './backdrop.module.css'

const Backdrop = ({ show, onClickFunction }) => {
  return (
    show ?
      <div role='button' aria-label='Close content' className={ styles.Backdrop } onClick={ onClickFunction } onKeyDown={ onClickFunction } tabIndex={0} />
    :
      null
  )
}

export default Backdrop
