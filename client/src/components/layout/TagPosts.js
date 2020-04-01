import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { getPosts } from '../../actions/postActions';
import { Container, Grid, Typography, Paper, Button } from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom';
import { followTag } from '../../actions/tagActions';
import PostItemSkeleton from '../../skeletons/PostItemSkeleton';
import PostItem from '../dashboard/PostItem';
import _ from 'underscore';

const skeletons = [];
_.times(9, index =>
	skeletons.push(
		<Grid item xs={12} sm={6} lg={4} key={index}>
			<PostItemSkeleton />
		</Grid>
	)
);

const TagPosts = ({ posts, userId, getPosts }) => {
	const match = useRouteMatch();
	const [tagPosts, setTagPosts] = useState(posts);

	useEffect(() => {
		getPosts();
	}, [getPosts]);

	useEffect(() => {
		setTagPosts(posts);
	}, [posts]);

	return (
		<Container style={{ margin: '1rem auto 5rem', padding: 0 }} maxWidth='lg'>
			<Grid container>
				<Grid container item md={9} direction='column'>
					<Paper
						style={{
							padding: '1rem',
							marginBottom: '1.5rem',
							backgroundColor: 'inherit'
						}}
					>
						<Grid container direction='row' justify='space-between'>
							<Typography variant='h4' color='secondary'>
								#{match.params.tag}
							</Typography>
							<Button
								variant='contained'
								color='primary'
								onClick={() => followTag(match.params.tag, userId)}
							>
								follow
							</Button>
						</Grid>
					</Paper>
					<Grid item container justify='space-evenly' spacing={1}>
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
				<Grid item md={3}></Grid>
			</Grid>
		</Container>
	);
};

const mapStateToProps = state => ({
	userId: state.auth.user.id,
	posts: state.posts.list
});
export default connect(
	mapStateToProps,
	{ getPosts }
)(TagPosts);
