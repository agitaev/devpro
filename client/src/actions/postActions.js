import axios from 'axios';
import { GET_ERRORS, GET_POSTS, ADD_POST, GET_POST } from './types';

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
			console.log(err.response);
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

// Create Post
export const createPost = (postData, history) => dispatch => {
	axios
		.post('/api/posts/new', postData)
		.then(res => {
			const { post } = res.data;
			dispatch({ type: ADD_POST, payload: post });
			history.push('/');
		}) // redirect to homepage
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Retrieve Single Post
export const getPostById = (postId, history) => dispatch => {
	axios
		.get(`/api/posts/${postId}`)
		.then(res => {
			const { post } = res.data;
			console.log(post);
			dispatch({ type: GET_POST, payload: post });
			history.push(`/posts/${postId}`);
		})
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
