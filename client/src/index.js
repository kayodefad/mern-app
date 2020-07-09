import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser } from './redux/user/user.actions'
import ThemeContextProvider from './contexts/ThemeContext'

import './index.css';
import App from './App';
import {store} from './redux/store'
import * as serviceWorker from './serviceWorker';

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken
  setAuthToken(token)
  const decoded = jwt_decode(token)
  store.dispatch(setCurrentUser(decoded))
}

// const currentTime = Date.now() / 1000 //to get in milliseconsds
// if (decoded.exp < currentTime) {
//   // Logout user
//   store.dispatch(logoutUser())
//   // Redirect to login
//   window.location.href = './login'
// }

ReactDOM.render(
  <Provider store={store}>
    <ThemeContextProvider>
      <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      </BrowserRouter>
    </ThemeContextProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
