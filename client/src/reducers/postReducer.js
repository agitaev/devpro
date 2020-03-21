import { GET_POSTS, ADD_POST, VOTE_POST } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_POSTS:
			return action.payload;
		case ADD_POST:
			return [...state, action.payload];
		case VOTE_POST: {
			const post = state.find(post => post._id === action.payload._id);
			if (post) post.vote_count = action.payload.vote_count;

			return state;
		}
		default:
			return state;
		// { ...state, posts: [...state.posts, action.payload] };
		// { ...state, posts: action.payload };
		// case GET_POST:
		// 	return action.payload;
		// case SET_POST:
		// 	return { ...state, post: action.payload };
		// case UPVOTE_POST: {
		// 	const updatedPost = state.posts.map(post =>
		// 		post._id === action.payload
		// 			? { ...post, vote_count: post.vote_count + 1 }
		// 			: post
		// 	);
		// 	console.log(updatedPost);
		// 	return { ...state, posts: updatedPost };
		// }
	}
};
