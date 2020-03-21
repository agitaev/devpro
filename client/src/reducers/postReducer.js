import {
	GET_POSTS,
	SET_POST,
	ADD_POST,
	UPVOTE_POST,
	VOTE_POST
} from '../actions/types';

const initialState = { posts: [], post: {} };

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_POSTS:
			return { ...state, posts: action.payload };
		case SET_POST:
			return { ...state, post: action.payload };
		case ADD_POST:
			return { ...state, posts: [...state.posts, action.payload] };
		case UPVOTE_POST: {
			const updatedPost = state.posts.map(post =>
				post._id === action.payload
					? { ...post, vote_count: post.vote_count + 1 }
					: post
			);
			// console.log(updatedPost);
			return { ...state, posts: updatedPost };
		}
		case VOTE_POST: {
			console.log(state);
			// return { ...state, posts: [...state.posts, action.payload] };
		}

		default:
			return state;
	}
};
