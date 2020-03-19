import React, { Component } from 'react';
import {
	Paper,
	Typography,
	Grid,
	Link,
	Chip,
	IconButton
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import {
	ExpandLessOutlined as UpvoteIcon,
	ExpandMoreOutlined as DownvoteIcon
} from '@material-ui/icons';
import moment from 'moment/';

class PostItem extends Component {
	state = {
		elevation: 0
	};

	onMouseOver = () => this.setState({ elevation: 5 });
	onMouseOut = () => this.setState({ elevation: 0 });

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
					src='https://via.placeholder.com/400x300'
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
						<div style={{ margin: '1rem 0 0' }}>
							<Chip
								size='small'
								clickable
								label='nodejs'
								component={RouterLink}
								to='/tags/nodejs'
								underline='none'
								style={{ margin: '0 .125rem' }}
							/>
							<Chip
								size='small'
								clickable
								label='nodejs'
								component={RouterLink}
								to='/tags/nodejs'
								underline='none'
								style={{ margin: '0 .125rem' }}
							/>
						</div>
					</Grid>
					<Grid item xs={1} sm={1} md={1}>
						<Grid
							container
							direction='column'
							justify='flex-start'
							alignItems='center'
						>
							<IconButton aria-label='upvote post' size='small'>
								<UpvoteIcon />
							</IconButton>
							<Typography variant='subtitle2'>{post.vote_count}</Typography>
							<IconButton aria-label='downvote post' size='small'>
								<DownvoteIcon />
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		);
	}
}

export default PostItem;
