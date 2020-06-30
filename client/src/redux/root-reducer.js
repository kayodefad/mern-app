import { combineReducers } from 'redux';
import userReducer from './user/user.reducers'
// import errorReducer from './user/user.error.reducer'
import postErrorReducer from './post/post.error.reducer'
import postsReducer from './post/post.reducer'

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer
});

export default rootReducer;
