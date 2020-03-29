import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { getPosts } from '../../actions/postActions';
import { Container, Hidden, Grid } from '@material-ui/core';
import _ from 'underscore';
import PostItemSkeleton from '../../skeletons/PostItemSkeleton';
import PostItem from '../dashboard/PostItem';
import { useRouteMatch } from 'react-router-dom';

const skeletons = [];
_.times(9, index =>
	skeletons.push(
		<Grid item xs={12} sm={6} lg={4} key={index}>
			<PostItemSkeleton />
		</Grid>
	)
);

const TagPosts = ({ posts, getPosts }) => {
	const match = useRouteMatch();
	const [tagPosts, setTagPosts] = useState(posts);

	useEffect(() => {
		getPosts();
	}, []);

	useEffect(() => {
		setTagPosts(posts);
	}, [posts]);

	return (
		<Container style={{ margin: '1rem auto 5rem', padding: 0 }} maxWidth='lg'>
			<Grid container>
				<Grid item container justify='space-evenly' md={9} spacing={1}>
					{tagPosts ? (
						tagPosts
							.filter(post =>
								post.tags.some(tag => tag.title === match.params.tag)
							)
							.map((post, id) => (
								<Grid item xs={12} sm={6} lg={4} key={id}>
									<PostItem post={post} withVoteController />
								</Grid>
							))
					) : (
						<Fragment>{skeletons}</Fragment>
					)}
				</Grid>
			</Grid>
		</Container>
	);
};

const mapStateToProps = state => ({
	posts: state.posts.list
});
export default connect(
	mapStateToProps,
	{ getPosts }
)(TagPosts);
