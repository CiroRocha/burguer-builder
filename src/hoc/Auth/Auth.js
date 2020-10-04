import React, { useState, useEffect } from 'react'

import { navigate } from '@reach/router'

import { useSelector, useDispatch } from 'react-redux'
import * as authActions from '../../store/actions/asyncActions/authActions'

import styles from './auth.module.css'

import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Spinner from '../../components/UI/Spinner/Spinner'

const Auth = () => {

  const dispatch = useDispatch()

  const [ displayForm, setDisplayForm ] = useState(null)
  const [ signIn, setSignIn ] = useState(false)

  const loading = useSelector( state => state.auth.loading )
  const error = useSelector( state => state.auth.error )
  const authToken = useSelector( state => state.auth.token )
  const redirectPath = useSelector( state => state.auth.authRedirectRoute )

  const authHandler = ( event ) => {
    event.preventDefault()
    dispatch( authActions.auth(event.target[0].value, event.target[1].value, signIn) )
  }

  const [ fieldsData, setFieldsData ] = useState({
    email: {
      elementType: 'input',
      defaultValue: '',
      elementConfig: {
        type: 'email',
        placeholder: 'Your e-mail',
      },
      validationRules: (
        function (value) {
          if(value !== '' && value.length >= 3) {
            return true
          } else {
            return false
          }
        }
      )
    },
    password: {
      elementType: 'input',
      defaultValue: '',
      elementConfig: {
        type: 'password',
        placeholder: 'Password',
      },
      validationRules: (
        function (value) {
          if(value !== '' && value.length >= 6) {
            return true
          } else {
            return false
          }
        }
      )
    },
  })

  useEffect(() => {
    if( loading ) {
      setDisplayForm(<Spinner />)
    } else {
      const formArray = []
      for ( let key in fieldsData ) {
        formArray.push({
          id: key,
          config: fieldsData[key],
        })
      }
      setDisplayForm(
        <>
            { formArray.map( formEl => {
              return <Input
                        label={ formEl.id }
                        key={ formEl.id }
                        elementName={ formEl.id }
                        elementType={ formEl.config.elementType }
                        elementConfig={ formEl.config.elementConfig }
                        value={ formEl.config.defaultValue }
                        validationRules={ formEl.config.validationRules }
                      />
            }) }
        </>
    )
    }
  }, [ loading, fieldsData ])

  useEffect(() => {
    if ( authToken ) {
      navigate( redirectPath )
      dispatch( authActions.setRedirectPath('/') )
    }
  }, [ authToken ])

  return (
    <div className={ styles.Auth } >
        <form onSubmit={ (event) => authHandler( event ) } >
          { displayForm }
          { error ? <p>{ error.message }</p> : null }
          <Button buttonType='Success' type='submit' >{ signIn ? 'Login' : 'Register' }</Button>
        </form>
        <Button buttonType='Danger' clicked={ () => setSignIn(!signIn) } >Switch to { signIn ? 'Register' : 'Login' }</Button>
    </div>
  )
}

export default Auth
