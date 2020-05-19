import { POST_COMMENT, APPROVE_COMMENT, DECLINE_COMMENT } from './types';
import axios from 'axios';

export const postComment = (data) => (dispatch) => {
	axios
		.post('/api/comments/new', data)
		.then((res) => {
			dispatch({
				type: POST_COMMENT,
				payload: { comment: res.data, postId: data.post._id },
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

export const approveComment = (commentId) => (dispatch) => {
	axios
		.post('/api/comments/approve', { commentId })
		.then((res) => dispatch({ type: APPROVE_COMMENT, payload: res.data }))
		.catch((err) => console.log(err));
};

export const declineComment = (commentId) => (dispatch) => {
	axios
		.post('/api/comments/decline', { commentId })
		.then((res) => dispatch({ type: DECLINE_COMMENT, payload: commentId }))
		.catch((err) => console.log(err));
};
