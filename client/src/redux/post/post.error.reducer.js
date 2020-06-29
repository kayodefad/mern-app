import {
  actionTypes
} from './post.types'

const initialState = {}

const postErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_ERROR:
      return action.payload
    case actionTypes.CLEAR_ERROR:
      return {}
      default:
        return state
  }
}

export default postErrorReducer