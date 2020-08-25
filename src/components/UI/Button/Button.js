import React from 'react'

import styles from './button.module.css'

const Button = ({ children, clicked, buttonType }) => {
  return (
    <button
      className={ [ styles.Button, styles[ buttonType ] ].join(' ') }
      onClick={ clicked }
    >
      { children }
    </button>
  )
}

export default Button
