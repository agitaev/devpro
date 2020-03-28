import {
	GET_POSTS,
	ADD_POST,
	VOTE_POST,
	SET_SEARCH_TEXT
} from '../actions/types';

const initialState = { list: [], searchText: '' };

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_POSTS:
			return { ...state, list: action.payload };
		case ADD_POST:
			return { ...state, list: [...state.list, action.payload] };
		case VOTE_POST: {
			console.log('paylaod', action.payload);
			const postIndex = state.list.findIndex(
				post => post._id === action.payload._id
			);
			const posts = state.list.map((post, index) =>
				index !== postIndex ? post : { ...post, ...action.payload }
			);

			return { ...state, list: posts };
		}
		case SET_SEARCH_TEXT:
			return { ...state, searchText: action.payload };
		default:
			return state;
	}
};
