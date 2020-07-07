import React, {
  useState,
  useEffect
} from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

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
  const [theme, setTheme] = useState({
    light: true
  })

  useEffect(() => {
    if (localStorage.getItem('theme') !== null) {
      const themevalue = localStorage.getItem('theme') === 'false' ? false : true
      setTheme({
        light: themevalue
      })
    }
    console.log(localStorage.getItem('theme'))
  }, [])

  const style = theme.light ? {
    background: '#fff',
    color: '#000'
  } : {
    background: '#191a19',
    color: '#fff'
  }

  const onToggle = () => {
    setTheme({
      light: !theme.light
    })
    localStorage.setItem('theme', !theme.light)
  }
  return ( 
    <div style = {style}>
      <div className = 'App'>
        <Navbar />
        <ToggleSwitch onToggle={onToggle} />
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