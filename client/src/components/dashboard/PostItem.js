import React, { Component } from 'react';
import { Paper, Typography, Grid, Link, IconButton } from '@material-ui/core';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import {
	ExpandLessOutlined as UpvoteIcon,
	StarBorderOutlined as SaveIcon,
	StarOutlined as UnsaveIcon
} from '@material-ui/icons';
import moment from 'moment/';
import TagChip from '../element/TagChip';
import { connect } from 'react-redux';
import { votePost, savePost } from '../../actions/postActions';
import isEmpty from 'is-empty';

class PostItem extends Component {
	state = {
		elevation: 0,
		post: { author: {}, tags: [] },
		saved: false
	};

	onMouseOver = () => this.setState({ elevation: 5 });
	onMouseOut = () => this.setState({ elevation: 0 });

	handleSavePostClick = () => {
		if (this.props.isAuthenticated) {
			this.props.savePost(this.props.post, this.props.user);
			this.setState({ saved: !this.state.saved });
		} else {
			// this.props.history.push('/login');
			console.log('unauthorized');
		}
	};

	handleUpvotePostClick = () => {
		this.props.votePost(this.props.post._id, 'upvote', this.props.user);
	};

	handleDownvotePostClick = () => {
		this.props.votePost(this.props.post._id, 'downvote', this.props.user);
	};

	componentDidMount() {
		const { user, saved_posts, post } = this.props;

		if (user && saved_posts && saved_posts.length > 0) {
			saved_posts.map(savedPost =>
				savedPost._id === post._id ? this.setState({ saved: true }) : null
			);
		}
	}

	componentDidUpdate(prevProps) {
		// console.log(prevProps);

		if (isEmpty(prevProps.user) && this.state.saved) {
			console.log('updated');
			this.setState({ saved: false });
		}
	}

	render() {
		const { post } = this.props;

		return (
			<Paper
				style={{
					padding: '1.4rem',
					backgroundColor: 'inherit'
				}}
				elevation={this.state.elevation}
				onMouseOver={this.onMouseOver}
				onMouseOut={this.onMouseOut}
			>
				<img
					src='https://via.placeholder.com/1200x800'
					style={{
						width: '100%',
						height: 'auto',
						display: 'block',
						marginBottom: '1rem'
					}}
					alt='meaningful text'
				/>
				<Grid container alignItems='center' style={{ marginBottom: '1rem' }}>
					<Typography variant='subtitle2' style={{ flex: 1 }}>
						{moment(post.created_at).format('MMM D')}
					</Typography>
					<IconButton
						aria-label='toggle save post'
						size='small'
						style={{ padding: 0 }}
						onClick={this.handleSavePostClick}
					>
						{!this.state.saved ? (
							<SaveIcon style={{ fontSize: '1.75rem' }} />
						) : (
							<UnsaveIcon style={{ fontSize: '1.75rem' }} />
						)}
					</IconButton>
				</Grid>
				<Grid
					container
					direction='row'
					justify='space-between'
					alignItems='flex-start'
				>
					<Grid item style={{ paddingRight: '.5rem', flex: 1 }}>
						<Typography
							gutterBottom
							variant='h5'
							component={RouterLink}
							to={`/posts/${post._id}`}
							color='inherit'
							style={{
								textDecoration: 'none',
								lineHeight: 'normal'
							}}
						>
							{post.title}
						</Typography>
						<Typography
							gutterBottom
							style={{ marginTop: '1rem' }}
							variant='subtitle1'
						>
							{post.subtitle}
						</Typography>
						{post.author && post.author !== undefined ? (
							<Grid
								container
								justify='space-between'
								alignContent='center'
								style={{ margin: '1rem 0 0' }}
							>
								<Link
									component={RouterLink}
									to={`/users/${post.author._id}`}
									underline='none'
									color='textSecondary'
								>
									{post.author.name}
								</Link>
							</Grid>
						) : null}
						<Grid container spacing={1} style={{ marginTop: '1rem' }}>
							{post.tags && post.tags.length > 0
								? post.tags.map((tag, index) => (
										<TagChip key={index} tag={tag} small />
								  ))
								: null}
						</Grid>
					</Grid>
					{this.props.withVoteController && (
						<Grid item>
							<Grid
								container
								direction='column'
								justify='flex-start'
								alignItems='center'
							>
								{/* <Button variant='contained' startIcon={<UpvoteIcon />}>
									{post.vote_count === 0 ? '•' : post.vote_count}
								</Button>*/}
								<IconButton
									aria-label='upvote post'
									size='small'
									style={{ padding: '0' }}
									onClick={this.handleUpvotePostClick}
								>
									<UpvoteIcon style={{ fontSize: '1.75rem' }} />
								</IconButton>
								<Typography variant='body2' style={{ lineHeight: 0.75 }}>
									{post.vote_count === 0 ? '•' : post.vote_count}
								</Typography>
								{/*
									<IconButton
										aria-label='downvote post'
										size='small'
										onClick={this.handleDownvotePostClick}
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
	user: state.auth.user,
	isAuthenticated: state.auth.isAuthenticated,
	saved_posts: state.auth.user.saved_posts
});

export default compose(
	connect(
		mapStateToProps,
		{ votePost, savePost }
	)
)(withRouter(PostItem));
