import axios from 'axios';
import { GET_TAGS, GET_ERRORS } from './types';

// Retrieve tags
export const getTags = () => dispatch => {
	axios
		.get('/api/tags')
		.then(res => {
			const tags = res.data;
			dispatch({ type: GET_TAGS, payload: tags });
			localStorage.setItem('tags', JSON.stringify(tags));
		})
		.catch(err => {
			dispatch({ type: GET_ERRORS, payload: err });
		});
};

export const getRecommendations = tags => {
	// console.log(tags);
};

export const followTag = (tagId, userId) => {
	axios
		.post(`/api/reactions/tag/${tagId}/subscribe`, { userId })
		.then(res => console.log(res))
		.catch(err => console.log(err));
};
