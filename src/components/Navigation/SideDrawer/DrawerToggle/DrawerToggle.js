import React from 'react'

import styles from './drawerToggle.module.css'

const DrawerToggle = ({ clicked }) => {
  return (
    <div role='button' aria-label='Display menu' onClick={ () => clicked() } onKeyDown={ () => clicked() } tabIndex={0} className={ styles.DrawerToggle } >
      <div />
      <div />
      <div />
    </div>
  )
}

export default DrawerToggle
