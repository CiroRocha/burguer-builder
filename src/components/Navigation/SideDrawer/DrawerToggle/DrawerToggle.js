import React from 'react'

import styles from './drawerToggle.module.css'

const DrawerToggle = ({ clicked }) => {
  return (
    <div onClick={ () => clicked() } className={ styles.DrawerToggle } >
      <div />
      <div />
      <div />
    </div>
  )
}

export default DrawerToggle
