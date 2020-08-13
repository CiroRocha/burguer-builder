import React, { useState } from 'react'

import styles from './layout.module.css'

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'

const Layout = ({ children }) => {

  const [ showSideDrawer, setShowSideDrawer ] = useState(false)

  return (
    <>
      <Toolbar DrawerToggleFunction={ () => setShowSideDrawer(!showSideDrawer) } />
      <SideDrawer showMe={ showSideDrawer } closed={ () => setShowSideDrawer(false) } />
      <main className={ styles.MainStyling } >
        { children }
      </main>
    </>
  )
}

export default Layout