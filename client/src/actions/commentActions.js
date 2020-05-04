import { POST_COMMENT } from './types';
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
