import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../Store';

import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../actions/authActions';

import PrivateRoute from '../Components/common/PrivateRoute';
import AdminRoute from '../Components/common/AdminRoute';

import '../Components/style/App.css';
import '../Components/style/style.css';
import Navbar from '../Components/layout/Navbar';
import Landing from '../Components/layout/Landing';
import UnderC from '../Components/layout/UnderC';
import Register from '../Components/auth/Register';
import Login from '../Components/auth/Login';
import Dashboard from '../Components/dashboard/Dashboard';
import NotFound from '../Components/layout/NotFound';
import AllUsers from '../Components/admin/AllUsers';

// Check for token
if (localStorage.jwtToken) { 
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store = {store} >
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={ Landing } />
            <Route path="/underconstruction" component={ UnderC } />
            <Route path="/register" component={ Register } />
            <Route path="/login" component={ Login } />
            <PrivateRoute path="/dashboard" component={ Dashboard } />
            <AdminRoute path="/allusers" component={ AllUsers } />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;