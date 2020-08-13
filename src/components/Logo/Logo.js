import React from 'react'

import styles from './logo.module.css'

import LogoImg from '../../images/burger-logo.png'

const Logo = props => {
  return (
    <div className={ styles.Logo } >
      <img src={ LogoImg } alt='Logo' />
    </div>
  )
}

export default Logo
