import {
  actionTypes
} from './post.types'

const initialState = {
  posts: [],
  post: {},
  paginatedPosts: [],
  activePage: 1,
  myPosts: [],
  isLoading: false,
  errors: {}
}

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_LOADING:
      return {
        ...state, isLoading: true
      }
      case actionTypes.POST_ERROR:
        return {
          ...state, errors: action.payload, isLoading: false
        }
        case actionTypes.CLEAR_ERROR:
          return {
            ...state, errors: {}
          }
          case actionTypes.CREATE_NEW_POST:
            return {
              ...state, isLoading: false
            }
            case actionTypes.FETCH_POSTS:
              return {
                ...state, posts: action.payload, isLoading: false
              }
              case actionTypes.FETCH_SINGLE_POST:
                return {
                  ...state, post: action.payload, isLoading: false
                }
                case actionTypes.FETCH_PAGINATED_POSTS:
                  return {
                    ...state, paginatedPosts: action.payload, isLoading: false
                  }
                  case actionTypes.SET_ACTIVE_PAGE:
                    return {
                      ...state, activePage: action.payload
                    }
                    case actionTypes.FETCH_ALL_MYPOSTS:
                      return {
                        ...state, myPosts: action.payload, isLoading: false
                      }
                      case actionTypes.EDIT_POST:
                        return {
                          ...state, isLoading: false
                        }
                        case actionTypes.DELETE_POST:
                          return {
                            ...state, isLoading: false
                          }
                          default:
                            return state
  }
}

export default postsReducer