import React, { useState, useEffect } from 'react'

import styles from './input.module.css'

const Input = ({ label, elementType, elementName, elementConfig, value, validationRules }) => {
  /* eslint jsx-a11y/no-onchange: 0 */

  const [ data, setData ] = useState(value)

  const [ valid, setValid ] = useState(true)
  const [ usedAtLeastOnce, setUsedAtLeastOnce ] = useState(false)

  let inputEl = null

  useEffect(() => {
    if ( validationRules(data) || !usedAtLeastOnce ) {
      return setValid(true)
    } else {
      return setValid(false)
    }
  }, [ data, usedAtLeastOnce, validationRules ])

  switch ( elementType ) {
    case 'input':
      inputEl = <input className={ styles.InputElement } name={ elementName } { ...elementConfig } value={ data } onChange={ (event) => setData(event.target.value) } onClick={ () => setUsedAtLeastOnce(true) } />
      break;
    case 'textarea':
      inputEl = <textarea className={ styles.InputElement } name={ elementName } { ...elementConfig } value={ data } onChange={ (event) => setData(event.target.value) } onClick={ () => setUsedAtLeastOnce(true) } />
      break;
    case 'select':
      inputEl = (
        <select className={ styles.InputElement } name={ elementName } value={ data } onChange={ (event) => setData(event.target.value) } onClick={ () => setUsedAtLeastOnce(true) } >
          {
            elementConfig.options.map((option) => {
              return <option key={ option.value } value={ option.value } >{ option.displayValue }</option>
            })
          }
        </select>
      )
      break;
    default:
      inputEl = <input className={ styles.InputElement } name={ elementName } { ...elementConfig } value={ data } onChange={ (event) => setData(event.target.value) } onClick={ () => setUsedAtLeastOnce(true) } />
  }

  return (
    <div className={ styles.Input } >
      <label  className={ styles.Label + valid ? null : ` ${styles.Invalid}` } >
        { label }
        { inputEl }
        { valid ? null : <span>This is invalid!</span> }
      </label>
    </div>
  )
}

export default Input
