import React from 'react'

import styles from './link.module.css'

const Link = ({ link, active, children }) => {
  return (
    <li className={ styles.NavItem } >
      <a href={ link } className={ active ? styles.active : null } >
        { children }
      </a>
    </li>
  )
}

export default Link