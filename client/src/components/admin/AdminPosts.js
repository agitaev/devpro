import React, { useEffect } from 'react';
import {
	Paper,
	Table,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Hidden,
	Button,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { getPosts, approvePost, declinePost } from '../../actions/postActions';
import { withRouter } from 'react-router-dom';
import dayjs from 'dayjs';

const AdminPosts = ({ posts, getPosts, approvePost, declinePost }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return (
		<TableContainer component={Paper}>
			<Table
				aria-label='posts-table'
				size='small'
				style={{ tableLayout: 'fixed' }}
			>
				<TableHead>
					<TableRow>
						<TableCell>Author</TableCell>
						<TableCell>Title</TableCell>
						<Hidden mdDown>
							<TableCell>Subtitle</TableCell>
						</Hidden>
						<TableCell>Body</TableCell>
						<Hidden mdDown>
							<TableCell>Tags</TableCell>
						</Hidden>
						<Hidden smDown>
							<TableCell>Date</TableCell>
						</Hidden>
						<TableCell align='right'>Status</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{posts &&
						posts.length > 0 &&
						posts.map((post, index) => (
							<TableRow key={index}>
								<TableCell>{post.author.name}</TableCell>
								<TableCell>{post.title}</TableCell>
								<Hidden mdDown>
									<TableCell>{post.subtitle}</TableCell>
								</Hidden>
								<TableCell>{post.body}</TableCell>
								<Hidden mdDown>
									<TableCell>
										{post.tags.map((tag) => tag.title + ' ')}
									</TableCell>
								</Hidden>
								<Hidden smDown>
									<TableCell>
										{dayjs(post.created_at).format('hh:mm A MMMM DD, YYYY')}
									</TableCell>
								</Hidden>
								<TableCell align='right'>
									<Button size='small' onClick={() => approvePost(post._id)}>
										Approve
									</Button>{' '}
									|{' '}
									<Button size='small' onClick={() => declinePost(post._id)}>
										Decline
									</Button>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

const mapStateToProps = (state) => ({
	posts: state.posts.list.filter((post) => !post.approved),
});

export default connect(
	mapStateToProps,
	{ getPosts, approvePost, declinePost }
)(withRouter(AdminPosts));
