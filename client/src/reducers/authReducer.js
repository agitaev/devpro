import {
	SET_CURRENT_USER,
	USER_LOADING,
	SYNC_SAVED_POSTS,
	SYNC_VOTED_POSTS
} from '../actions/types';
const isEmpty = require('is-empty');

const initialState = {
	isAuthenticated: false,
	user: {},
	loading: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			};
		case USER_LOADING:
			return {
				...state,
				loading: true
			};
		case SYNC_SAVED_POSTS:
			return {
				...state,
				user: {
					...state.user,
					saved_posts: [...state.user.saved_posts, action.payload]
				}
			};
		case SYNC_VOTED_POSTS: {
			return {
				...state,
				user: {
					...state.user,
					voted_posts: [...state.user.voted_posts, action.payload]
				}
			};
		}
		default:
			return state;
	}
};
