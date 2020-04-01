import {
	USER_LOADING,
	SET_CURRENT_USER,
	SYNC_SAVED_POSTS,
	SYNC_VOTED_POSTS,
	SWITCH_ALLOW_DARK_MODE,
	SWITCH_ALLOW_NOTIFICATION,
	SWITCH_ALLOW_PERSONALIZED_FEED,
	SYNC_CREATED_POSTS
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
		case SYNC_VOTED_POSTS:
			return {
				...state,
				user: {
					...state.user,
					voted_posts: [...state.user.voted_posts, action.payload]
				}
			};
		case SYNC_CREATED_POSTS:
			return {
				...state,
				user: {
					...state.user,
					created_posts: [...state.user.created_posts, action.payload]
				}
			};
		case SWITCH_ALLOW_PERSONALIZED_FEED: {
			return {
				...state,
				user: {
					...state.user,
					allow_personalized_feed: !state.user.allow_personalized_feed
				}
			};
		}
		case SWITCH_ALLOW_DARK_MODE: {
			return {
				...state,
				user: {
					...state.user,
					allow_dark_mode: !state.user.allow_dark_mode
				}
			};
		}
		case SWITCH_ALLOW_NOTIFICATION: {
			return {
				...state,
				user: {
					...state.user,
					allow_notifications: !state.user.allow_notifications
				}
			};
		}
		default:
			return state;
	}
};
