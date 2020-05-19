import React, { Fragment } from 'react';
import UserPost from './UserPost';
import { Typography } from '@material-ui/core';

const UserPosts = ({ posts }) => {
	return (
		<Fragment>
			<Typography variant='h6'>Created posts</Typography>
			{posts && posts.length > 0 ? (
				posts.map((post) => <UserPost key={post._id} post={post} />)
			) : (
				<Typography variant='overline' align='center'>
					Looks like you didn't post anything yet.
				</Typography>
			)}
		</Fragment>
	);
};

export default UserPosts;
