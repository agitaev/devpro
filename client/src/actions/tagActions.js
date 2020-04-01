import axios from 'axios';
import { GET_TAGS, GET_ERRORS } from './types';

// Retrieve tags
export const getTags = () => dispatch => {
	fetch('/api/tags')
		.then(res => res.json())
		.then(tags => dispatch({ type: GET_TAGS, payload: tags }))
		.catch(err => console.log(err));
};

export const followTag = (tag, userId) => {
	if (!/[0-9a-fA-F]{24}/.test(tag)) {
		const jsonBody = { userId };
		fetch(`/api/tags/${tag}`)
			.then(res => res.json())
			.then(data => {
				return fetch(`/api/reactions/tag/${data[0]._id}/subscribe`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(jsonBody)
				});
			})
			.then(res => res.json())
			.then(res => console.log(res))
			.catch(err => console.log(err));
	}
};
