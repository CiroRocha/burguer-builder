import React from 'react'

import styles from './modal.module.css'

import Backdrop from '../Backdrop/Backdrop'

const Modal = ({ show, children, modalClosed }) => {
  return (
    <>
      <Backdrop show={ show } onClickFunction={ modalClosed } />
      <div className={ styles.Modal } style={{ transform: show ? 'translateY(0)' : 'translateY(-100vh)', opacity: show ? '1' : '0' }} >
        { children }
      </div>
    </>
  )
}

export default Modal
