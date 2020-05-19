import React, { useEffect } from 'react';
import { Grid, Typography, Paper, Divider } from '@material-ui/core';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';

const AdminOverview = ({
	postsApproved,
	postsDeclined,
	commentsApproved,
	commentsDeclined,
	getPosts,
}) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return (
		<Grid container spacing={3} alignItems='stretch' direction='row'>
			<Grid item xs={12} md={6}>
				<Paper
					variant='outlined'
					style={{ padding: '1rem', maxWidth: '540px', margin: '0 auto' }}
				>
					<Typography variant='h6' gutterBottom>
						Posts
					</Typography>
					<Divider />
					<Typography variant='body1' style={{ paddingTop: '1rem' }}>
						Approved: {postsApproved}
					</Typography>
					<Typography variant='body1'>Declined: {postsDeclined}</Typography>
				</Paper>
			</Grid>
			<Grid item xs={12} md={6}>
				<Paper
					variant='outlined'
					style={{ padding: '1rem', maxWidth: '540px', margin: '0 auto' }}
				>
					<Typography variant='h6' gutterBottom>
						Comments
					</Typography>
					<Divider />
					<Typography variant='body1' style={{ paddingTop: '1rem' }}>
						Approved: {commentsApproved}
					</Typography>
					<Typography variant='body1'>Declined: {commentsDeclined}</Typography>
				</Paper>
			</Grid>
		</Grid>
	);
};

const mapStateToProps = (state) => {
	let commentsApproved = 0,
		commentsDeclined = 0,
		postsApproved = 0,
		postsDeclined = 0;

	state.posts.list.filter((post) => {
		post.approved ? postsApproved++ : postsDeclined++;
		return post.comments.map((comment) =>
			comment.approved ? commentsApproved++ : commentsDeclined++
		);
	});

	return {
		postsApproved,
		postsDeclined,
		commentsApproved,
		commentsDeclined,
	};
};

export default connect(
	mapStateToProps,
	{ getPosts }
)(AdminOverview);
