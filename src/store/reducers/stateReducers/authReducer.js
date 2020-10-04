import * as actionTypes from '../../actions/actionTypes'

const initialState = {
  token: null,
  refreshToken: null,
  userId: null,
  error: null,
  loading: null,
  authRedirectRoute: '/',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      }

    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        refreshToken: action.refreshToken,
        error: null,
        loading: false,
      }

      case actionTypes.AUTH_FAILURE:
        return {
          ...state,
          error: action.error,
          loading: false,
        }

      case actionTypes.AUTH_LOGOUT:
        return {
          ...state,
          token: null,
          userId: null,
        }

      case actionTypes.AUTH_SET_REDIRECT:
        return {
          ...state,
          authRedirectRoute: action.authRedirectRoute
        }

    default: return state
  }
}

export default reducer
