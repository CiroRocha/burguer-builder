import React from 'react'

import styles from './sideDrawer.module.css'

import Backdrop from '../../UI/Backdrop/Backdrop'
import Logo from '../../Logo/Logo'
import NavItems from '../NavItem/NavItem'

const SideDrawer = ({ showMe, closed }) => {

  let attachClassNames = [ styles.SideDrawer, styles.Close ]

  if ( showMe ) {
    attachClassNames = [ styles.SideDrawer, styles.Open ]
  }

  return (
    <>
      <Backdrop show={ showMe } onClickFunction={ () => closed() } />
      <div className={ attachClassNames.join(' ') } >
        <div className={ styles.Logo } >
          <Logo />
        </div>
        <nav>
          <NavItems />
        </nav>
      </div>
    </>
  )
}

export default SideDrawer
