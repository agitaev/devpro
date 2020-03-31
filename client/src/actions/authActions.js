import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {
	GET_ERRORS,
	SET_CURRENT_USER,
	USER_LOADING,
	LOGOUT_USER
} from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
	console.log(history);
	axios
		.post('/api/users/register', userData)
		.then(res =>
			history.push({
				pathname: '/',
				state: {
					fromlocation: history.location.pathname,
					email: userData.email
				}
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Login - get user token
export const loginUser = (userData, history) => dispatch => {
	axios
		.post('/api/users/login', userData)
		.then(res => {
			// Save to localStorage
			// Set token to localStorage
			const { token } = res.data;
			localStorage.setItem('jwtToken', token);
			// Set token to Auth header
			setAuthToken(token);
			// Decode token to get user data
			const decoded = jwt_decode(token);
			// console.log(decoded);
			// Set current user
			dispatch(setCurrentUser(decoded));
			// Redirect user to homepage
			history.push({ pathname: '/' });
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Set logged in user
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

// User loading
export const setUserLoading = () => {
	return {
		type: USER_LOADING
	};
};

// Log user out
export const logoutUser = () => dispatch => {
	// clear localStorage and personal preferences
	localStorage.clear();
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to empty object {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
	dispatch({ type: LOGOUT_USER });
};

// Verify user email
export const confirmUserEmail = token => {
	axios
		.post('/api/users/email_confirmation', { token })
		.then(res => {
			console.log('res.data', res.data);
			loginUser(res.data);
		})
		.catch(err => console.log(err));
};
