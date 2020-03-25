import { GET_POSTS, ADD_POST, VOTE_POST } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_POSTS:
			return action.payload;
		case ADD_POST:
			return [...state, action.payload];
		case VOTE_POST: {
			const postIndex = state.findIndex(
				post => post._id === action.payload._id
			);
			return state.map((post, index) => {
				if (index !== postIndex) {
					return post;
				}
				return {
					...post,
					...action.payload
				};
			});
		}
		default:
			return state;
	}
};
