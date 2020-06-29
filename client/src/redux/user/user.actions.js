import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import {
  actionTypes
} from './user.types'

// Register User
export const registerUser = (userData, history) => async dispatch => {
  dispatch({
    type: actionTypes.USER_LOADING
  })
  try {
    await axios.post('/api/users/register', userData)
    dispatch({
      type: actionTypes.REGISTER_USER
    })
    history.push('/login')
  } catch (e) {
    dispatch(getErrors(e.response.data))
  }
}

// Login User
export const loginUser = (userData) => async dispatch => {
  dispatch({
    type: actionTypes.USER_LOADING
  })
  try {
    const res = await axios.post('/api/users/login', userData)
    // Save to localStorage
    const {
      token
    } = res.data

    localStorage.setItem('jwtToken', token)
    // Set token to Auth header
    setAuthToken(token)
    // Decode token to get user data
    const decoded = jwt_decode(token)
    // Set current user
    dispatch(setCurrentUser(decoded))
  } catch (e) {
    dispatch(getErrors(e.response.data))
  }
}

// Set logged in user
export const setCurrentUser = decoded => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: decoded
})

// Set errors 
const getErrors = errors => ({
  type: actionTypes.GET_ERRORS,
  payload: errors
})

// Clear errors
export const clearErrors = () => ({
  type: actionTypes.CLEAR_ERRORS
})

// User loading
export const setUserLoading = () => {
  return {
    type: actionTypes.USER_LOADING
  }
}

export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false)
  // Set current user to null
  dispatch(setCurrentUser(null))
}