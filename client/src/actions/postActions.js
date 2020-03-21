import axios from 'axios';
import {
	GET_ERRORS,
	GET_POSTS,
	ADD_POST,
	SET_POST,
	UPVOTE_POST,
	VOTE_POST
} from './types';

// Retrieve Posts
export const getPosts = () => dispatch => {
	axios
		.get('/api/posts')
		.then(res => {
			const posts = res.data;
			dispatch({ type: GET_POSTS, payload: posts });
			localStorage.setItem('posts', JSON.stringify(posts));
		})
		.catch(err => {
			dispatch({ type: GET_ERRORS, payload: err });
		});
};

// Retrieve Single Post
export const getPost = postId => dispatch => {
	axios
		.get(`/api/posts/${postId}`)
		.then(res => {
			const post = res.data;
			// dispatch({ type: GET_POST, payload: post });
			localStorage.setItem('post', JSON.stringify(post));
		})
		.catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};

// Create Post
export const createPost = (postData, history) => dispatch => {
	let tags = [];
	let promises = [];

	// loop through each tag and collect promises
	postData.tags.forEach(tag =>
		promises.push(
			axios
				.get(`/api/tags/${tag}`)
				.then(res => tags.push(res.data[0]._id))
				.catch(err =>
					dispatch({ type: GET_ERRORS, payload: err.response.data })
				)
		)
	);

	// resolve promises
	axios
		.all(promises)
		.then(res => {
			axios
				.post('/api/posts/new', { ...postData, tags })
				.then(res => {
					// console.log(res.data);
					dispatch({
						type: ADD_POST,
						payload: {
							...postData,
							tags
						}
					});

					history.push('/');
				})
				.catch(err =>
					dispatch({ type: GET_ERRORS, payload: err.response.data })
				);
		})
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// control post votes
export const votePost = (postId, action, user) => dispatch => {
	axios
		.post(`/api/posts/${postId}/action`, { action, user })
		.then(res => dispatch({ type: VOTE_POST, payload: res.data }))
		.catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};

export const setPost = post => {
	return {
		type: SET_POST,
		payload: post
	};
};

export const upvotePost = id => {
	return {
		type: UPVOTE_POST,
		payload: id
	};
};
