import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './postReducer';
import errorReducer from './errorReducer';
import tagReducer from './tagReducer';

export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	posts: postReducer,
	tags: tagReducer
});
