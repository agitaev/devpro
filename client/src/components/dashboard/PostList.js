import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import PostItem from './PostItem';

class PostList extends Component {
	render() {
		return (
			<Grid container justify='space-evenly' spacing={1}>
				{this.props.posts.map((post, id) => (
					<Grid item xs={12} sm={6} md={4} lg={4} key={id}>
						<PostItem post={post} />
					</Grid>
				))}
			</Grid>
		);
	}
}

export default PostList;
