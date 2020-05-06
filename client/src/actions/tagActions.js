import { GET_TAGS } from './types';

// Retrieve tags
export const getTags = () => (dispatch) => {
	fetch('/api/tags')
		.then((res) => res.json())
		.then((tags) => dispatch({ type: GET_TAGS, payload: tags }))
		.catch((err) => console.log(err));
};

export const followTag = (tag, userId) => {
	console.log(tag, userId);
	if (!/[0-9a-fA-F]{24}/.test(tag)) {
		const jsonBody = { userId };
		fetch(`/api/tags/${tag}`)
			.then((res) => res.json())
			.then((data) => {
				return fetch(`/api/reactions/tag/${data[0]._id}/subscribe`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(jsonBody),
				});
			})
			.then((resBody) => resBody.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	}
};
