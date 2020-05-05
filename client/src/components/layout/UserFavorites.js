import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import UserFavorite from './UserFavorite';

const UserFavorites = ({ posts }) => {
	return (
		<Fragment>
			<Typography variant='h6'>Saved posts</Typography>
			{posts && posts.length > 0 ? (
				posts.map((post) => <UserFavorite key={post._id} post={post} />)
			) : (
				<Typography variant='overline' align='center'>
					Saved posts will appear here.
				</Typography>
			)}
		</Fragment>
	);
};

export default UserFavorites;
