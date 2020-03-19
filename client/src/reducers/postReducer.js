import { GET_POSTS, GET_POST, ADD_POST } from '../actions/types';

const initialState = { posts: [] };

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_POSTS:
			return { ...state, posts: action.payload };

		default:
			return state;
	}
};
