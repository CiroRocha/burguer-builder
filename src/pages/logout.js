import React, { useEffect } from 'react'

import { navigate } from '@reach/router'

import { useDispatch } from 'react-redux'
import * as authActions from '../store/actions/asyncActions/authActions'

const Logout = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authActions.logout())
    navigate('/')
  }, [])

  return <div></div>
}

export default Logout
