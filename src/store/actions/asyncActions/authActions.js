import * as actionTypes from '../actionTypes'

import axios from 'axios'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = ( token, userId, refreshToken ) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    refreshToken: refreshToken,
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
      const expirationDate = new Date(new Date().getTime() + ( res.data.expiresIn * 1000 ))
      localStorage.setItem('authToken', res.data.idToken)
      localStorage.setItem('expirationDate', expirationDate)
      localStorage.setItem('refreshToken', res.data.refreshToken)

      dispatch(authSuccess(res.data.idToken, res.data.localId, res.data.refreshToken))
      dispatch(checkAuthTimeout(res.data.expiresIn, res.data.refreshToken))
    })
    .catch( err => {
      dispatch(authFailure(err.response.data.error))
    })
  }
}

export const logout = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('refreshToken')

  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = ( expirationTime, currentRefreshToken ) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(refreshToken( currentRefreshToken ))
    }, expirationTime * 1000)
  }
}

export const setRedirectPath = ( authRedirectRoute ) => {
  return {
    type: actionTypes.AUTH_SET_REDIRECT,
    authRedirectRoute: authRedirectRoute,
  }
}

export const refreshToken = ( refreshToken ) => {
  return dispatch => {
    axios.post( 'https://securetoken.googleapis.com/v1/token?key=AIzaSyBb4JtLDKy_scX2TOgV355dMYiVlcuIiBM', {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }).then( res => {
      const expirationDate = new Date(new Date().getTime() + ( res.data.expires_in * 1000 ))
      localStorage.setItem('authToken', res.data.id_token)
      localStorage.setItem('expirationDate', expirationDate)
      localStorage.setItem('refreshToken', res.data.refresh_token)

      dispatch(authSuccess(res.data.id_token, res.data.user_id, res.data.refresh_token))
      dispatch(checkAuthTimeout(res.data.expires_in, res.data.refresh_token))
    })
    .catch( err => {
      dispatch(authFailure(err.response.data.error))
    })
  }
}

export const authCheckState = () => {
  return dispatch => {
    if ( typeof window !== 'undefined' ) {
      const authToken = localStorage.getItem('authToken')

      if ( !authToken ) {
        dispatch( logout() )
      } else {
        const expirationDate = new Date( localStorage.getItem('expirationDate') )

        if ( expirationDate < new Date() ) {
          dispatch( logout() )
        } else {
          dispatch( refreshToken( localStorage.getItem( 'refreshToken' ) ) )
        }
      }
    }
  }
}