import React from 'react'

import styles from './layout.module.css'

const Layout = ({ children }) => {
  return (
    <>
      <div>
        Toolbar, Sidedrawer, Backdrop
      </div>
      <main className={ styles.MainStyling } >
        { children }
      </main>
    </>
  )
}

export default Layout