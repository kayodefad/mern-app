import {
  actionTypes
} from './user.types'

const initialState = {}

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ERRORS:
      return action.payload
    default:
      return state
  }
}

export default errorReducer