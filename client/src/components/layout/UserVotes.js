import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import UserVote from './UserVote';

const UserVotes = ({ posts }) => {
	console.log(posts);
	return (
		<Fragment>
			<Typography variant='h6'>Voted posts</Typography>
			{posts && posts.length > 0 ? (
				posts.map(post => <UserVote key={post._id} post={post} />)
			) : (
				<Typography variant='overline' align='center'>
					Your voted posts will be shown here.
				</Typography>
			)}
		</Fragment>
	);
};

export default UserVotes;
