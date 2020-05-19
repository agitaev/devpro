import {
	GET_POSTS,
	ADD_POST,
	VOTE_POST,
	SET_SEARCH_TEXT,
	POST_COMMENT,
	APPROVE_POST,
	APPROVE_COMMENT,
	DECLINE_COMMENT,
	DECLINE_POST,
} from '../actions/types';

const initialState = { list: [], searchText: '' };

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_POSTS:
			return { ...state, list: action.payload };
		case ADD_POST:
			return { ...state, list: [...state.list, action.payload] };
		case VOTE_POST: {
			const postIndex = state.list.findIndex(
				(post) => post._id === action.payload._id
			);
			const posts = state.list.map((post, index) =>
				index !== postIndex ? post : { ...post, ...action.payload }
			);

			return { ...state, list: posts };
		}
		case SET_SEARCH_TEXT:
			return { ...state, searchText: action.payload };
		case POST_COMMENT: {
			const postIndex = state.list.findIndex(
				(post) => post._id === action.payload.postId
			);
			const updatedPosts = state.list.map((post, index) =>
				index !== postIndex
					? post
					: { ...post, comments: [action.payload.comment, ...post.comments] }
			);

			return { ...state, list: updatedPosts };
		}
		case APPROVE_POST: {
			const postIndex = state.list.findIndex(
				(post) => post._id === action.payload.postId
			);
			const updatedPosts = state.list.map((post, index) =>
				index !== postIndex ? post : { ...post, approved: true }
			);

			return { ...state, list: updatedPosts };
		}
		case DECLINE_POST: {
			const updatedPosts = state.list.filter(
				(post) => post._id !== action.payload
			);

			return { ...state, list: updatedPosts };
		}
		case APPROVE_COMMENT: {
			let postIndex, updatedComment;
			const commentId = action.payload._id;
			state.list.map(
				(post, index) =>
					post.comments.length > 0 &&
					post.comments.map((comment) => {
						if (comment._id === commentId) {
							postIndex = index;
							updatedComment = comment;
							updatedComment.approved = true;
						}

						return updatedComment;
					})
			);

			const updatedPosts = state.list.map((post, index) =>
				index !== postIndex
					? post
					: { ...post, comments: [...post.comments, updatedComment] }
			);

			return { ...state, list: updatedPosts };
		}
		case DECLINE_COMMENT: {
			// @TODO
			let posts = state.list;

			for (let i = 0; i < posts.length; i++) {
				posts[i].comments.filter((comment) => comment._id !== action.payload);
			}

			return state;
		}

		default:
			return state;
	}
};
