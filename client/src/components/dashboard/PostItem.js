import React, { Component } from 'react';
import { Paper, Typography, Grid, Link, IconButton } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import {
	ExpandLessOutlined as UpvoteIcon
	// ExpandMoreOutlined as DownvoteIcon
} from '@material-ui/icons';
import moment from 'moment/';
import TagChip from './TagChip';
import { connect } from 'react-redux';
import { votePost } from '../../actions/postActions';

class PostItem extends Component {
	state = {
		elevation: 0,
		post: { author: {}, tags: [] }
	};

	onMouseOver = () => this.setState({ elevation: 5 });
	onMouseOut = () => this.setState({ elevation: 0 });

	upvotePost = () => {
		this.props.votePost(this.props.post._id, 'upvote', this.props.user);
	};

	downvotePost = () => {
		this.props.votePost(this.props.post._id, 'downvote', this.props.user);
	};

	render() {
		const { post } = this.props;

		return (
			<Paper
				style={{
					padding: '2rem',
					marginTop: '1rem',
					backgroundColor: 'inherit'
				}}
				elevation={this.state.elevation}
				onMouseOver={this.onMouseOver}
				onMouseOut={this.onMouseOut}
			>
				<img
					src='https://via.placeholder.com/1200x800'
					style={{ width: '100%', height: 'auto' }}
					alt='meaningful text'
				/>
				<Typography variant='overline' style={{ margin: '1rem 0 .5rem' }}>
					{moment(post.created_at).format('MMM D')}
				</Typography>
				<Grid
					container
					direction='row'
					justify='space-between'
					alignItems='flex-start'
					style={{ margin: '.5rem 0 1rem' }}
				>
					<Grid item xs={11} sm={11} md={11} style={{ paddingRight: '.5rem' }}>
						<Typography
							variant='h5'
							component={RouterLink}
							to={`/posts/${post._id}`}
							color='inherit'
							style={{ textDecoration: 'none', lineHeight: 'normal' }}
						>
							{post.title}
						</Typography>
						{post.author ? (
							<Grid
								container
								justify='space-between'
								alignContent='center'
								style={{ margin: '1rem 0 0' }}
							>
								<Link
									component={RouterLink}
									to='/users/user-with-id'
									underline='none'
									color='textSecondary'
								>
									{post.author.name}
								</Link>
							</Grid>
						) : null}
						<Grid container spacing={1} style={{ padding: '1rem 0' }}>
							{post.tags
								? post.tags.map(tag => (
										<TagChip key={tag._id} tag={tag} small />
								  ))
								: null}
						</Grid>
					</Grid>
					{this.props.withVoteController && (
						<Grid item xs={1} sm={1} md={1}>
							<Grid
								container
								direction='column'
								justify='flex-start'
								alignItems='center'
							>
								<IconButton
									aria-label='upvote post'
									size='small'
									style={{ padding: 0 }}
									onClick={this.upvotePost}
								>
									<UpvoteIcon />
								</IconButton>
								<Typography variant='subtitle2'>
									{post.vote_count === 0 ? '•' : post.vote_count}
								</Typography>
								{/*
									<IconButton
										aria-label='downvote post'
										size='small'
										onClick={this.downvotePost}
									>
										<DownvoteIcon />
									</IconButton>
								*/}
							</Grid>
						</Grid>
					)}
				</Grid>
			</Paper>
		);
	}
}

const mapStateToProps = state => ({
	user: state.auth.user
});

export default connect(
	mapStateToProps,
	{ votePost }
)(PostItem);
