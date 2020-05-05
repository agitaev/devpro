import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import UserComment from './UserComment';

const UserComments = ({ comments }) => {
	return (
		<Fragment>
			<Typography variant='h6'>Comments</Typography>
			{comments && comments.length > 0 ? (
				comments.map((comment) => (
					<UserComment key={comment._id} comment={comment} />
				))
			) : (
				<Typography variant='overline' align='center'>
					Your replies to posts will appear here.
				</Typography>
			)}
		</Fragment>
	);
};

export default UserComments;
