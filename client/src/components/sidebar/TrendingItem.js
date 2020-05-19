import React, { Component } from 'react';
import { Paper, Typography, Grid, IconButton } from '@material-ui/core';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import {
	StarBorderOutlined as SaveIcon,
	StarOutlined as UnsaveIcon,
} from '@material-ui/icons';
import { connect } from 'react-redux';
import isEmpty from 'is-empty';
import { savePost } from '../../actions/postActions';

class TrendingItem extends Component {
	state = {
		elevation: 0,
		saved: false,
	};

	onMouseOver = () => this.setState({ elevation: 5 });
	onMouseOut = () => this.setState({ elevation: 0 });

	handleSavePostClick = () => {
		if (this.props.isAuthenticated) {
			this.props.savePost(this.props.post._id, this.props.user.id);
			this.setState({ saved: !this.state.saved });
		} else {
			this.props.history.push('/login');
		}
	};

	componentDidMount() {
		const { user, saved_posts, post } = this.props;

		if (user && saved_posts && saved_posts.length > 0) {
			saved_posts.map((savedPost) =>
				savedPost._id === post._id ? this.setState({ saved: true }) : null
			);
		}
	}

	componentDidUpdate(prevProps) {
		if (isEmpty(prevProps.user) && this.state.saved) {
			this.setState({ saved: false });
		}
	}

	render() {
		const { post } = this.props;
		return (
			<Paper
				style={{ padding: '1rem', background: 'inherit' }}
				elevation={this.state.elevation}
				onMouseOver={this.onMouseOver}
				onMouseOut={this.onMouseOut}
			>
				{/*<img
				src='https://via.placeholder.com/400x300'
				style={{ width: '100%', height: 'auto', display: 'block' }}
				alt='meaningful text'
			/>*/}
				<Grid container alignItems='flex-start' justify='space-between'>
					<Grid
						container
						item
						xs={11}
						lg={10}
						direction='column'
						style={{ paddingRight: '.50rem' }}
					>
						<Typography
							gutterBottom
							component={RouterLink}
							variant='h5'
							to={`/posts/${post._id}`}
							style={{
								fontSize: '1.2rem',
								textDecoration: 'none',
								lineHeight: 'normal',
								display: 'block',
							}}
							color='inherit'
						>
							{post.title}
						</Typography>
						{post.author ? (
							<Typography
								variant='caption'
								color='textSecondary'
								component={RouterLink}
								to={`/users/${post.author._id}`}
								style={{ textDecoration: 'none' }}
							>
								{post.author.name}
							</Typography>
						) : null}
					</Grid>
					<Grid container item xs={1} lg={2} justify='flex-end'>
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
				</Grid>
			</Paper>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.auth.user,
	isAuthenticated: state.auth.isAuthenticated,
	saved_posts: state.auth.user.saved_posts,
});

export default connect(
	mapStateToProps,
	{ savePost }
)(withRouter(TrendingItem));
