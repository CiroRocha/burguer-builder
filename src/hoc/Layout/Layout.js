import React, { useState } from 'react'
// import { BrowserRouter } from 'react-router-dom'

import styles from './layout.module.css'

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'

const Layout = ({ children }) => {

  const [ showSideDrawer, setShowSideDrawer ] = useState(false)

  return (
    // This is where routing main component would be if routing was not managed by Gatsby
    // <BrowserRouter>
    <>
      <Toolbar DrawerToggleFunction={ () => setShowSideDrawer(!showSideDrawer) } />
      <SideDrawer showMe={ showSideDrawer } closed={ () => setShowSideDrawer(false) } />
      <main className={ styles.MainStyling } >
        { children }
      </main>
    </>
    // </BrowserRouter>
  )
}

export default Layout