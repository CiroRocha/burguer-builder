import React from 'react'

import styles from './navItem.module.css'

import Link from './Link/Link'

const NavItem = () => {
  return (
    <ul className={ styles.NavItems } >
      <Link link='/' >Burguer Builder</Link>
      <Link link='/orders'  >Orders</Link>
    </ul>
  )
}

export default NavItem
