import React, { Fragment } from 'react';
import UserPost from './UserPost';

const UserPosts = props => {
	return (
		<Fragment>
			{props.posts && props.posts.length > 0
				? props.posts.map(post => <UserPost key={post._id} post={post} />)
				: null}
		</Fragment>
	);
};

export default UserPosts;
