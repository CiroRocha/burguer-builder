import React from 'react'

import styles from './toolbar.module.css'

import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import Logo from '../../Logo/Logo'
import NavItem from '../NavItem/NavItem'

const Toolbar = ({ DrawerToggleFunction }) => {
  return (
    <header className={ styles.Toolbar } >
      <DrawerToggle clicked={ ()  => DrawerToggleFunction() } />
      <div className={ styles.Logo } >
        <Logo />
      </div>
      <nav className={ styles.DesktopOnly } >
        <NavItem />
      </nav>
    </header>
  )
}

export default Toolbar
