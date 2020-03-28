import { combineReducers } from 'redux';
import { SET_CURRENT_USER } from '../actions/types';
import authReducer from './authReducer';
import postReducer from './postReducer';
import errorReducer from './errorReducer';
import tagReducer from './tagReducer';

const rootReducer = (state, action) => {
	if (action.type === SET_CURRENT_USER && action.payload === {}) {
		state = undefined;
	}

	return appReducer(state, action);
};

export const appReducer = combineReducers({
	auth: authReducer,
	errors: errorReducer,
	posts: postReducer,
	tags: tagReducer
});
