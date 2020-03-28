import React, { Fragment } from 'react';
import UserPost from './UserPost';
import { Typography } from '@material-ui/core';

const UserPosts = props => {
	return (
		<Fragment>
			<Typography variant='h6'>Created posts</Typography>
			{props.posts && props.posts.length > 0 ? (
				props.posts.map(post => <UserPost key={post._id} post={post} />)
			) : (
				<Typography variant='overline' align='center'>
					Looks like you didn't post anything yet.
				</Typography>
			)}
		</Fragment>
	);
};

export default UserPosts;
