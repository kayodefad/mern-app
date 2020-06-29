import {
  actionTypes
} from './post.types'

const initialState = {
  posts: [],
  post: {},
  paginatedPosts: [],
  activePage: 1,
  myPosts: [],
  isLoading: false
}

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_LOADING:
      return {
        ...state, isLoading: true
      }
      case actionTypes.FETCH_POSTS:
        return {
          ...state, posts: action.payload
        }
        case actionTypes.FETCH_SINGLE_POST:
          return {
            ...state, post: action.payload
          }
          case actionTypes.FETCH_PAGINATED_POSTS:
            return {
              ...state, paginatedPosts: action.payload
            }
            case actionTypes.SET_ACTIVE_PAGE:
              return {
                ...state, activePage: action.payload
              }
              case actionTypes.FETCH_ALL_MYPOSTS:
                return {
                  ...state, myPosts: action.payload
                }
                case actionTypes.EDIT_POST:
                  return {
                    ...state, loading: false
                  }
                  default:
                    return state
  }
}

export default postsReducer