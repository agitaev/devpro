import { combineReducers } from 'redux';
import { LOGOUT_USER } from '../actions/types';
import authReducer from './authReducer';
import postReducer from './postReducer';
import errorReducer from './errorReducer';
import tagReducer from './tagReducer';

const appReducer = combineReducers({
	auth: authReducer,
	errors: errorReducer,
	posts: postReducer,
	tags: tagReducer
});

export const rootReducer = (state, action) => {
	if (action.type === LOGOUT_USER) {
		state = undefined;
	}

	return appReducer(state, action);
};
