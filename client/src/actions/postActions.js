import axios from 'axios';
import {
	GET_ERRORS,
	GET_POSTS,
	ADD_POST,
	VOTE_POST,
	SYNC_SAVED_POSTS,
	SET_SEARCH_TEXT,
	SYNC_VOTED_POSTS,
	RESET_ERRORS,
	SYNC_CREATED_POSTS
} from './types';

// Retrieve Posts
export const getPosts = () => dispatch => {
	fetch('/api/posts')
		.then(res => res.json())
		.then(posts => {
			dispatch({ type: GET_POSTS, payload: posts });
		})
		.catch(err => {
			console.log(err.response);
		});
};

// Create Post
export const createPost = (data, history) => dispatch => {
	console.log(data);
	axios
		.post('/api/posts/new', data)
		.then(res => {
			dispatch({ type: ADD_POST, payload: data });
			// dispatch({ type: SYNC_CREATED_POSTS, payload: data });

			// let oldPosts = JSON.parse(localStorage.getItem('posts'));
			// oldPosts.push(res.data);
			// localStorage.setItem('posts', JSON.stringify(oldPosts));

			history.push('/');
		})
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// control post votes
export const votePost = (postId, action, userId) => dispatch => {
	axios
		.post(`/api/posts/${postId}/action`, { action, userId })
		.then(res => {
			dispatch({ type: VOTE_POST, payload: res.data });
			dispatch({ type: SYNC_VOTED_POSTS, payload: res.data });
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: {
					id: err.response.config.url.split('/')[3],
					error: 'Unvote/Downvote is not supported (yet)'
				}
			})
		);
};

export const savePost = (postId, userId) => dispatch => {
	axios
		.post(`/api/reactions/post/${postId}/save`, { userId })
		.then(res => {
			const payload = res.data.saved_posts.find(post => post._id === postId);
			return dispatch({ type: SYNC_SAVED_POSTS, payload });
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: {
					id: err.response.config.url.split('/')[3],
					error: 'Unhandled error'
				}
			})
		);
};

export const setSearchText = query => {
	return {
		type: SET_SEARCH_TEXT,
		payload: query
	};
};

export const resetErrors = () => {
	return {
		type: RESET_ERRORS
	};
};
