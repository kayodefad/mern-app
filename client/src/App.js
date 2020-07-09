import React, {
  useContext
} from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import {themes, ThemeContext} from './contexts/ThemeContext'

import './App.scss';
import Navbar from './components/navbar/navbar.component';
import Landing from './components/landing/landing.component';
import Register from './components/register/register.component'
import Login from './components/login/login.component'
import Dashboard from './components/dashboard/dashboard.component'
import PrivateRoute from './components/private-route/privateRoute.component'
import Newpost from './components/newpost/newpost.component'
import Singlepost from './components/singlepost/singlepost.component'
import Myposts from './components/myposts/myposts.component'
import Footer from './components/footer/footer.component'
import Editpost from './components/editpost/editpost.component'
import NotFound from './components/notfound/notfound.component'
import ToggleSwitch from './components/toggle-switch/toggle-switch.component'

const App = () => {
  const {theme} = useContext(ThemeContext)
  const themeValues = theme.light ? themes.light : themes.dark
  return (
    <div style={{background: themeValues.background, color: themeValues.foreground}}>
      <div className = 'App'>
        <Navbar />
        <ToggleSwitch />
        <Switch >
          <Route exact path = '/' component = {Landing} /> 
          <Route path = '/register' component = {Register} /> 
          <Route path='/login' component={Login} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute path='/newpost' component={Newpost} />
          <PrivateRoute path='/singlepost/:id' component={Singlepost} />
          <PrivateRoute path='/myposts' component={Myposts} />
          <PrivateRoute path='/editpost/:id' component={Editpost} />
          <Route path = '*' component = {NotFound} /> 
        </Switch> 
      </div>
        <Footer />
      </div>
  );
};

export default App;