import React from 'react'
import { Link } from 'gatsby'

import styles from './link.module.css'

const NavLink = ({ link, children }) => {
  return (
    <li className={ styles.NavItem } >
      <Link to={ link } activeClassName={ styles.active } >
        { children }
      </Link>
    </li>
  )
}

export default NavLink