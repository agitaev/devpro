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
import { getPosts } from '../../actions/postActions';
import dayjs from 'dayjs';
import { approveComment, declineComment } from '../../actions/commentActions';

const AdminComments = ({ comments, getPosts, approveComment }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return (
		<TableContainer component={Paper}>
			<Table
				aria-label='comments-table'
				size='small'
				style={{ tableLayout: 'fixed' }}
			>
				<TableHead>
					<TableRow>
						<TableCell>Author</TableCell>
						<TableCell>Comment</TableCell>
						<Hidden smDown>
							<TableCell>Date</TableCell>
						</Hidden>
						<TableCell style={{ width: '10%' }}>Thread</TableCell>
						<TableCell align='right'>Status</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{comments &&
						comments.length > 0 &&
						comments.map((comment, index) => (
							<TableRow key={index}>
								<TableCell>{comment.author.name}</TableCell>
								<TableCell>{comment.body}</TableCell>
								<Hidden smDown>
									<TableCell>
										{dayjs(comment.created_at).format('hh:mm A MMMM DD, YYYY')}
									</TableCell>
								</Hidden>
								<TableCell style={{ width: '10%' }}>Link</TableCell>
								<TableCell align='right'>
									<Button onClick={() => approveComment(comment._id)}>
										Approve
									</Button>{' '}
									|{' '}
									<Button onClick={() => declineComment(comment._id)}>
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

const mapStateToProps = (state) => {
	let comments = [];
	state.posts.list.map((post) =>
		post.comments.map((comment) =>
			!comment.approved ? comments.push(comment) : null
		)
	);

	return { comments };
};

export default connect(
	mapStateToProps,
	{ getPosts, approveComment }
)(AdminComments);
