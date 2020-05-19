import axios from 'axios';
import {
	SWITCH_ALLOW_DARK_MODE,
	SWITCH_ALLOW_NOTIFICATION,
	SWITCH_ALLOW_PERSONALIZED_FEED,
} from './types';

export const switchAllowNotification = (userId) => (dispatch) => {
	axios
		.post('/api/users/toggle_allow_notifications', { userId })
		.then((res) => dispatch({ type: SWITCH_ALLOW_NOTIFICATION }))
		.catch((err) => console.log(err));
};

export const switchAllowDarkMode = (userId) => (dispatch) => {
	axios
		.post('/api/users/toggle_dark_mode', { userId })
		.then((res) => dispatch({ type: SWITCH_ALLOW_DARK_MODE }))
		.catch((err) => console.log(err));
};

export const switchAllowPersonalizedFeed = (userId) => (dispatch) => {
	axios
		.post('/api/users/toggle_allow_personalized_feed', { userId })
		.then((res) => dispatch({ type: SWITCH_ALLOW_PERSONALIZED_FEED }))
		.catch((err) => console.log(err));
};
