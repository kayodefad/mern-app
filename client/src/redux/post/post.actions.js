import {
  actionTypes
} from './post.types'
import axios from 'axios'

export const createPost = (postData, history) => async (dispatch, getState) => {
  try {
    await axios.post('/api/posts/newpost', {
      ...postData,
      author: getState().user.currentUser._id,
      owner: getState().user.currentUser.name
    })
    history.push('/dashboard')
  } catch (e) {
    dispatch(postError(e.response.data))
  }
}

export const fetchPosts = () => async dispatch => {
  try {
    const response = await axios.get('/api/posts')
    dispatch({
      type: actionTypes.FETCH_POSTS,
      payload: response.data
    })
  } catch (e) {
    dispatch(postError(e.response.data))
  }
}

export const fetchSinglePost = (id) => async dispatch => {
  try {
    const response = await axios.get(`/api/posts/${id}`)
    dispatch({
      type: actionTypes.FETCH_SINGLE_POST,
      payload: response.data
    })
  } catch (e) {
    dispatch(postError(e.response.data))
  }
}

export const fetchPaginatedPosts = (pageNumber) => async dispatch => {
  try {
    const response = await axios.get(`api/posts/pages?page=${pageNumber}&limit=3`)
    dispatch({
      type: actionTypes.FETCH_PAGINATED_POSTS,
      payload: response.data
    })
  } catch (e) {
    dispatch(postError(e.response.data))
  }
}

// Set Pagination Active Page
export const setActivePage = (pageNumber) => ({
  type: actionTypes.SET_ACTIVE_PAGE,
  payload: pageNumber
})

const postError = error => ({
  type: actionTypes.POST_ERROR,
  payload: error
})

export const clearError = () => ({
  type: actionTypes.CLEAR_ERROR
})