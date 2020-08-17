// import React, { Component } from 'react'
import React, { useState, useEffect } from 'react'

import Modal from '../../components/UI/Modal/Modal'

function manageErrorHandler (WrappedComponent, axios) {

  return props => {

    const [ errorCatcher, setErrorCatcher ] = useState(null)

    const requestInterceptor = axios.interceptors.request.use( req => { // Resets the error before sending the next request
      setErrorCatcher(null)
      return req
    })

    const responseInterceptor = axios.interceptors.response.use(res => res, error => {
      setErrorCatcher(error)
    })

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(requestInterceptor)
        axios.interceptors.response.eject(responseInterceptor)
      }
    }, [requestInterceptor, responseInterceptor])

    const errorConfirmedHandler = () => {
      setErrorCatcher(null)
    }

    return (
      <>
        <Modal show={ errorCatcher } modalClosed={ errorConfirmedHandler } >
          { errorCatcher ? errorCatcher.message : null }
        </Modal>
        <WrappedComponent {...props} />
      </>
    )
  }
}

export default manageErrorHandler
