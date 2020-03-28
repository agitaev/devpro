import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import UserFavorite from './UserFavorite';

const UserFavorites = props => {
	return (
		<Fragment>
			<Typography variant='h6'>Saved posts</Typography>
			{props.posts && props.posts.length > 0 ? (
				props.posts.map(post => <UserFavorite key={post._id} post={post} />)
			) : (
				<Typography variant='overline' align='center'>
					Saved posts will appear here.
				</Typography>
			)}
		</Fragment>
	);
};

export default UserFavorites;
