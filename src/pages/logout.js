import React, { useEffect } from 'react'

import { navigate } from '@reach/router'

import { useDispatch } from 'react-redux'
import * as authActions from '../store/actions/asyncActions/authActions'

const Logout = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authActions.logout())
    navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div></div>
}

export default Logout
