import * as actionTypes from '../actionTypes'

import axios from 'axios'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = ( token, userId ) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  }
}

export const authFailure = ( error ) => {
  return {
    type: actionTypes.AUTH_FAILURE,
    error: error,
  }
}

export const auth = ( email, password, signIn ) => {
  return dispatch => {

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBb4JtLDKy_scX2TOgV355dMYiVlcuIiBM'

    if ( signIn === true ) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBb4JtLDKy_scX2TOgV355dMYiVlcuIiBM'
    }

    dispatch( authStart() )
    axios.post( url , {
      email: email,
      password: password,
      returnSecureToken: true,
    }).then( res => {
      dispatch(authSuccess(res.data.idToken, res.data.localId))
      dispatch(checkAuthTimeout(res.data.expiresIn))
    })
    .catch( err => {
      dispatch(authFailure(err.response.data.error))
    })
  }
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = ( expirationTime ) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}

export const setRedirectPath = ( authRedirectRoute ) => {
  return {
    type: actionTypes.AUTH_SET_REDIRECT,
    authRedirectRoute: authRedirectRoute,
  }
}