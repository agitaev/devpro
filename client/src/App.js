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
import Profile from './components/view/Profile';
import BottomNavbar from './components/layout/BottomNavbar';
import TrendingBoard from './components/dashboard/TrendingBoard';
import EmailConfirmation from './components/auth/EmailConfirmation';
import TagPosts from './components/layout/TagPosts';
import SearchBoard from './components/dashboard/SearchBoard';

import { Hidden, ThemeProvider, createMuiTheme } from '@material-ui/core';
import { light, dark } from './utils/theme';
import ScrollToTop from './utils/ScrollToTop';

const lightTheme = createMuiTheme(light);
const darkTheme = createMuiTheme(dark);

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
				<ThemeProvider theme={lightTheme}>
					<Router>
						<ScrollToTop>
							<div className='App'>
								<Navbar />
								<Route exact path='/' component={Dashboard} />
								<Route exact path='/register' component={Register} />
								<Route exact path='/login' component={Login} />
								<Route
									exact
									path='/email_confirmation'
									component={EmailConfirmation}
								/>
								<Route
									exact
									path='/posts/:postId([0-9a-fA-F]{24})' // match mongodb objectid
									component={Post}
								/>
								<Route
									exact
									path='/users/:userId([0-9a-fA-F]{24})' // match mongodb objectid
									component={Profile}
								/>
								<Route exact path='/tags/:tag' component={TagPosts} />
								<Route exact path='/trending' component={TrendingBoard} />
								<Route exact path='/search' component={SearchBoard} />
								<Switch>
									<PrivateRoute
										exact
										path='/posts/new'
										component={CreatePost}
									/>
									<PrivateRoute path='/me' component={Profile} />
								</Switch>
								<Hidden mdUp>
									<BottomNavbar />
								</Hidden>
							</div>
						</ScrollToTop>
					</Router>
				</ThemeProvider>
			</Provider>
		);
	}
}

export default App;
