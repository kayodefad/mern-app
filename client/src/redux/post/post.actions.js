import {
  actionTypes
} from './post.types'
import axios from 'axios'

// Create Post
export const createPost = (postData, history) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.POST_LOADING
  })
  try {
    await axios.post('/api/posts/newpost', {
      ...postData,
      author: getState().user.currentUser._id,
      owner: getState().user.currentUser.name
    })
    dispatch({
      type: actionTypes.CREATE_NEW_POST
    })
    history.push('/dashboard')
  } catch (e) {
    dispatch(postError(e.response.data))
  }
}

// Fetch All Posts
export const fetchPosts = () => async dispatch => {
  dispatch({
    type: actionTypes.POST_LOADING
  })
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

// Fetch Single Post
export const fetchSinglePost = (id) => async dispatch => {
  dispatch({
    type: actionTypes.POST_LOADING
  })
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

// Fetch Paginated Posts
export const fetchPaginatedPosts = (pageNumber) => async dispatch => {
  dispatch({
    type: actionTypes.POST_LOADING
  })
  try {
    const response = await axios.get(`/api/posts/pages?page=${pageNumber}&limit=3`)
    dispatch({
      type: actionTypes.FETCH_PAGINATED_POSTS,
      payload: response.data
    })
  } catch (e) {
    dispatch(postError(e.response.data))
  }
}

// Fetch All Posts
export const fetchAllMyPosts = () => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.POST_LOADING
  })
  try {
    const response = await axios.get(`/api/posts/me/${getState().user.currentUser._id}`)
    dispatch({
      type: actionTypes.FETCH_ALL_MYPOSTS,
      payload: response.data
    })
  } catch (e) {
    dispatch(postError(e.response.data))
  }
}

// Edit Single Post
export const editPost = (id, data, history) => async dispatch => {
  dispatch({
    type: actionTypes.POST_LOADING
  })
  try {
    const response = await axios.patch(`/api/posts/${id}`, data)
    dispatch({
      type: actionTypes.EDIT_POST
    })
    history.push('/myposts')
  } catch (e) {
    dispatch(postError(e.response.data))
  }
}

// Delete Single Post
export const deletePost = (id, history) => async dispatch => {
  dispatch({
    type: actionTypes.POST_LOADING
  })
  try {
    const response = await axios.delete(`api/posts/${id}`)
    dispatch({
      type: actionTypes.DELETE_POST
    })
    history.push('/myposts')
  } catch (e) {
    dispatch(postError(e.response.data))
  }
} 

// Set Pagination Active Page
export const setActivePage = (pageNumber) => ({
  type: actionTypes.SET_ACTIVE_PAGE,
  payload: pageNumber
})

// Post Error
const postError = error => ({
  type: actionTypes.POST_ERROR,
  payload: error
})

// Clear Post Error
export const clearError = () => ({
  type: actionTypes.CLEAR_ERROR
})