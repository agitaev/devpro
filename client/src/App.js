import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/private/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import Post from './components/view/Post';
import CreatePost from './components/view/CreatePost';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
	// Set auth token header auth
	const token = localStorage.jwtToken;
	setAuthToken(token);

	// Decode token and get user info and exp
	const decoded = jwt_decode(token);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));

	// Check for expired token
	const currentTime = Date.now() / 1000; // to get in milliseconds
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());
		// Redirect to login
		window.location.href = './login';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className='App'>
						<Navbar />
						<Switch>
							<PrivateRoute exact path='/posts/new' component={CreatePost} />
						</Switch>
						<Route exact path='/' component={Dashboard} />
						<Route exact path='/register' component={Register} />
						<Route exact path='/login' component={Login} />
						<Route
							exact
							path='/posts/:postId([0-9a-fA-F]{24})' // match mongodb objectid
							component={Post}
						/>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
