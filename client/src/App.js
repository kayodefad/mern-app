import React from 'react';
import { Route, Switch } from 'react-router-dom';

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

const App = () => {
  return (
    <>
    <div className='App'>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute path='/newpost' component={Newpost} />
        <PrivateRoute path='/singlepost/:id' component={Singlepost} />
        <PrivateRoute path='/myposts' component={Myposts} />
        <PrivateRoute path='/editpost/:id' component={Editpost} />
      </Switch>
    </div>
      <Footer />
    </>
  );
};

export default App;
