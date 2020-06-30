import {
  actionTypes
} from './user.types'

const empty = require("is-empty")

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  loading: false,
  errors: {}
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOADING:
      return {
        ...state, loading: true
      }
      case actionTypes.SET_CURRENT_USER:
        return {
          ...state, isAuthenticated: !empty(action.payload), currentUser: action.payload,
            loading: false
      }
    case actionTypes.REGISTER_USER:
      return {...state, loading: false}
        case actionTypes.GET_ERRORS:
          return {
            ...state, errors: action.payload, loading: false
          }
          case actionTypes.CLEAR_ERRORS:
            return {
              ...state, errors: {}, loading: false
            }
            default:
              return state;
  }
}
export default userReducer