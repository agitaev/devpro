import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { isEmpty } from 'underscore';
import { getPosts } from '../../actions/postActions';
import {
	Container,
	Typography,
	Grid,
	Avatar,
	Divider
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import TagChip from '../dashboard/TagChip';
import PostItem from '../dashboard/PostItem';

class Post extends Component {
	state = {
		post: {}
	};

	componentDidMount() {
		// console.log('mounted');
		this.props.getPosts();
		// console.log(this.props);
		// const post = JSON.parse(localStorage.getItem('post'));
		// if (isEmpty(this.state.post)) this.setState({ post });
	}

	// shouldComponentUpdate() {
	// 	if (this.props.post) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }

	render() {
		const { post } = this.props;

		return (
			<React.Fragment>
				{post ? (
					<Container maxWidth='lg' style={{ marginBottom: '3rem' }}>
						<img
							src='https://via.placeholder.com/800x400'
							style={{ width: '100%', height: 'auto' }}
							alt='meaningful text'
						/>
						<Grid container justify='center'>
							<Grid item sm={12} md={6}>
								<div style={{ marginTop: '2rem' }}>
									<header>
										<Typography variant='h2' gutterBottom>
											{post.title}
										</Typography>
										<Typography variant='h5' gutterBottom>
											{post.subtitle ? post.subtitle : ''}
										</Typography>
										<Typography
											variant='subtitle1'
											component={RouterLink}
											to={`/users/${post.author ? post.author._id : ''}`}
											color='inherit'
											style={{ textDecoration: 'none' }}
											gutterBottom
										>
											{post.author ? `By ${post.author.name}` : 'loading...'}
										</Typography>
									</header>
								</div>
								<div style={{ padding: '1rem 0' }}>
									<Typography variant='h6' gutterBottom>
										Description
									</Typography>
									<Typography variant='body1' gutterBottom>
										{post.body}
									</Typography>
								</div>
								<div>
									<div style={{ padding: '1rem 0 1rem' }}>
										<Typography variant='inherit' gutterBottom>
											{moment(post.created_at).format('MMM D, YYYY')}
										</Typography>
										<Grid container spacing={2} style={{ padding: '1rem 0' }}>
											{post.tags
												? post.tags.map(tag => (
														<TagChip key={tag._id} tag={tag} />
												  ))
												: '...loading'}
										</Grid>
									</div>
									<div style={{ padding: '1rem 0 3rem' }}>
										<Typography variant='h6' gutterBottom>
											Author
										</Typography>
										<Grid
											container
											alignItems='center'
											spacing={2}
											style={{
												padding: '.5rem 0',
												textDecoration: 'none',
												color: 'inherit'
											}}
											component={RouterLink}
											to={`/users/${post.author ? post.author._id : ''}`}
										>
											{post.author ? (
												<React.Fragment>
													<Grid item>
														<Avatar>
															{post.author.name.substring(0, 1).toUpperCase()}
														</Avatar>
													</Grid>
													<Grid item>
														<Typography
															variant='subtitle1'
															to={`/tags/`}
															style={{ textDecoration: 'none' }}
															color='inherit'
														>
															{post.author.name}
														</Typography>
													</Grid>
												</React.Fragment>
											) : (
												''
											)}
										</Grid>
									</div>
								</div>
							</Grid>
						</Grid>
						<Divider />
						<div style={{ padding: '2rem 0 1rem' }}>
							<Typography variant='h6' gutterBottom>
								Related
							</Typography>
							<div>
								<Grid container direction='row'>
									<Grid item xs={12} sm={6}>
										{post.author ? <PostItem post={post} /> : ''}
									</Grid>
									<Grid item xs={12} sm={6}>
										{post.author ? <PostItem post={post} /> : ''}
									</Grid>
								</Grid>
							</div>
						</div>
					</Container>
				) : (
					console.log('loading')
				)}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state, props) => {
	const post = state.posts.find(post => post._id === props.match.params.postId);
	console.log(post);
	return { post };
};

export default connect(
	mapStateToProps,
	{ getPosts }
)(Post);
