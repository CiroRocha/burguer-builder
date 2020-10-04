import React from 'react'

import { useSelector } from 'react-redux'

import styles from './navItem.module.css'

import Link from './Link/Link'

const NavItem = () => {

  const token = useSelector( state => state.auth.token )

  return (
    <ul className={ styles.NavItems } >
      <Link link='/' >Burger Builder</Link>
      { token ? <Link link='/orders' >Orders</Link> : null }
      { token ? <Link link='/logout'>Logout</Link> : <Link link='/login' >Authenticate</Link> }
    </ul>
  )
}

export default NavItem
