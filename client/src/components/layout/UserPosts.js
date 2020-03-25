import React, { Fragment } from 'react';
import { Paper, Typography } from '@material-ui/core';

const UserPosts = props => {
	return (
		<Fragment>
			<Typography variant='subtitle2' gutterBottom>
				March 23
			</Typography>
			<Paper style={{ padding: '.5rem' }}>
				<p>user posts</p>
			</Paper>
		</Fragment>
	);
};

export default UserPosts;
