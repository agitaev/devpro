import React, { Component } from 'react';
import { Paper, Typography, Grid, Link, IconButton } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import {
	ExpandLessOutlined as UpvoteIcon,
	BookmarkBorderOutlined as SaveIcon,
	BookmarkOutlined as UnsaveIcon
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
		this.props.savePost(this.props.post._id, this.props.user);
		this.setState({ saved: !this.state.saved });
	};

	handleUpvotePostClick = () => {
		this.props.votePost(this.props.post._id, 'upvote', this.props.user);
	};

	handleDownvotePostClick = () => {
		this.props.votePost(this.props.post._id, 'downvote', this.props.user);
	};

	componentDidMount() {
		if (
			this.props.saved_posts &&
			this.props.saved_posts.includes(this.props.post._id)
		) {
			this.setState({ saved: true });
		}
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	if (nextProps.user) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }

	componentDidUpdate(prevProps) {
		if (isEmpty(prevProps.user) && this.state.saved) {
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
				<Grid container alignItems='center'>
					<Typography variant='overline' style={{ flex: 1 }}>
						{moment(post.created_at).format('MMM D')}
					</Typography>
					<IconButton
						aria-label='save post'
						size='small'
						style={{ padding: 0 }}
						onClick={this.handleSavePostClick}
					>
						{!this.state.saved ? <SaveIcon /> : <UnsaveIcon />}
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
						<Grid container spacing={1} style={{ marginTop: '1rem' }}>
							{post.tags
								? post.tags.map(tag => (
										<TagChip key={tag._id} tag={tag} small />
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
								<IconButton
									aria-label='upvote post'
									size='small'
									style={{ padding: 0 }}
									onClick={this.handleUpvotePostClick}
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
	saved_posts: state.auth.user.saved_posts
});

export default connect(
	mapStateToProps,
	{ votePost, savePost }
)(PostItem);
