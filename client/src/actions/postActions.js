import axios from 'axios';
import {
	GET_ERRORS,
	GET_POSTS,
	ADD_POST,
	VOTE_POST,
	SYNC_SAVED_POSTS,
	SET_SEARCH_TEXT,
	SYNC_VOTED_POSTS
} from './types';

// Retrieve Posts
export const getPosts = () => async dispatch => {
	await axios
		.get('/api/posts')
		.then(res => {
			const posts = res.data;
			dispatch({ type: GET_POSTS, payload: posts });
			localStorage.setItem('posts', JSON.stringify(posts));
		})
		.catch(err => {
			console.log(err);
		});
};

// Create Post
export const createPost = (postData, history) => dispatch => {
	console.log(postData);
	let tags = [];
	let promises = [];

	// loop through each tag and collect promises
	if (postData.tags.length > 0 && postData.tags[0] !== '') {
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
	}

	// resolve promises
	axios
		.all(promises)
		.then(() => {
			axios
				.post('/api/posts/new', { ...postData, tags })
				.then(res => {
					dispatch({
						type: ADD_POST,
						payload: {
							...postData,
							tags
						}
					});

					let oldPosts = JSON.parse(localStorage.getItem('posts'));
					oldPosts.push(res.data);
					localStorage.setItem('posts', JSON.stringify(oldPosts));

					history.push('/');
				})
				.catch(err =>
					dispatch({ type: GET_ERRORS, payload: err.response.data })
				);
		})
		.catch(err => console.log(err));
};

// control post votes
export const votePost = (postId, action, userId) => dispatch => {
	axios
		.post(`/api/posts/${postId}/action`, { action, userId })
		.then(res => {
			dispatch({ type: VOTE_POST, payload: res.data });
			// dispatch({ type: SYNC_VOTED_POSTS, payload: res.data });
		})
		.catch(err => console.log(err));
};

export const savePost = (postId, userId) => dispatch => {
	axios
		.post(`/api/reactions/post/${postId}/save`, { userId })
		.then(res => {
			const payload = res.data.saved_posts.find(post => post._id === postId);
			return dispatch({ type: SYNC_SAVED_POSTS, payload });
		})
		.catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};

export const setSearchText = query => {
	return {
		type: SET_SEARCH_TEXT,
		payload: query
	};
};
