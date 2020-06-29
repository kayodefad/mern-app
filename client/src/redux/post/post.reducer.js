import {
  actionTypes
} from './post.types'

const initialState = {
  posts: [],
  post: {}
}

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POSTS:
      return {
        ...state, posts: action.payload
      }
      case actionTypes.FETCH_SINGLE_POST:
        return {
          ...state, post: action.payload
        }
        default:
          return state
  }
}

export default postsReducer