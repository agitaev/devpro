import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// import { isEmpty } from 'underscore';
import { getPosts, votePost, savePost } from '../../actions/postActions';
import {
	Container,
	Typography,
	Grid,
	Avatar,
	Divider,
	Button,
	ButtonGroup,
	Hidden
} from '@material-ui/core';
import {
	ExpandLessOutlined as UpvoteIcon,
	StarBorderOutlined as SaveIcon
	// StarOutlined as UnsaveIcon
} from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import TagChip from '../chunks/TagChip';
import PostItem from '../dashboard/PostItem';
import _ from 'underscore';
import { Skeleton } from '@material-ui/lab';

class Post extends Component {
	componentDidMount() {
		this.props.getPosts();
	}

	render() {
		const { post, recommended_posts, userId } = this.props;

		return (
			<Fragment>
				<Container maxWidth='lg' style={{ marginBottom: '6rem' }}>
					<Grid container justify='center'>
						<Grid container item sm={12} md={8} lg={6} direction='column'>
							<div style={{ marginTop: '2rem' }}>
								<header>
									{post && post.title ? (
										<Typography variant='h2' gutterBottom>
											{post.title}
										</Typography>
									) : (
										<Fragment>
											<Skeleton animation='wave' height={50} width='70%' />
											<Skeleton animation='wave' height={50} width='90%' />
											<Skeleton
												animation='wave'
												height={50}
												width='50%'
												style={{ marginBottom: '2rem' }}
											/>
										</Fragment>
									)}
									{post && post.subtitle ? (
										<Typography variant='h5' gutterBottom>
											{post.subtitle ? post.subtitle : ''}
										</Typography>
									) : (
										<Fragment>
											<Skeleton animation='wave' height={30} width='90%' />
											<Skeleton animation='wave' height={30} width='40%' />
										</Fragment>
									)}
									<Grid container justify='space-between' alignItems='center'>
										<Grid item>
											{post && post.author ? (
												<Typography
													variant='subtitle1'
													component={RouterLink}
													to={`/users/${post.author ? post.author._id : ''}`}
													color='inherit'
													style={{ textDecoration: 'none' }}
													gutterBottom
												>
													By {post.author.name}
												</Typography>
											) : (
												<Skeleton animation='wave' height={25} width='30%' />
											)}
										</Grid>
										<Grid item>
											<Hidden smDown>
												{post ? (
													<ButtonGroup size='small'>
														<Button
															startIcon={<SaveIcon />}
															onClick={() =>
																this.props.savePost(post._id, userId)
															}
														>
															save
														</Button>
														<Button
															startIcon={<UpvoteIcon />}
															onClick={() =>
																this.props.votePost(post._id, userId)
															}
														>
															upvote
														</Button>
													</ButtonGroup>
												) : null}
											</Hidden>
										</Grid>
									</Grid>
								</header>
							</div>
							<div style={{ padding: '1rem 0' }}>
								{post && post.body ? (
									<Typography variant='body1' gutterBottom>
										{post.body}
									</Typography>
								) : (
									<Skeleton animation='wave' height={400} width='100%' />
								)}
							</div>
							<div>
								<div style={{ padding: '1rem 0 1rem' }}>
									{post && post.created_at ? (
										<Typography variant='inherit' gutterBottom>
											{moment(post.created_at).format('MMM D, YYYY')}
										</Typography>
									) : (
										<Skeleton animation='wave' height={30} width='25%' />
									)}
									<Grid container spacing={2} style={{ padding: '1rem 0' }}>
										{post &&
											post.tags &&
											post.tags.map(tag => <TagChip key={tag._id} tag={tag} />)}
									</Grid>
								</div>
								<div style={{ padding: '1rem 0 3rem' }}>
									{post && post._id ? (
										<Typography variant='h6' gutterBottom>
											Author
										</Typography>
									) : (
										<Skeleton animation='wave' height={35} width='15%' />
									)}
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
										to={`/users/${post && post.author ? post.author._id : ''}`}
									>
										<Grid item>
											{post && post.author ? (
												<Avatar>
													{post.author.name.substring(0, 1).toUpperCase()}
												</Avatar>
											) : (
												<Skeleton
													variant='circle'
													animation='wave'
													height={50}
													width={50}
												/>
											)}
										</Grid>
										<Grid item>
											{post && post.author ? (
												<Typography
													variant='subtitle1'
													to={`/tags/`}
													style={{ textDecoration: 'none' }}
													color='inherit'
												>
													{post.author.name}
												</Typography>
											) : (
												<Skeleton animation='wave' height={30} width={200} />
											)}
										</Grid>
									</Grid>
								</div>
							</div>
						</Grid>
					</Grid>
					<Divider />
					<div style={{ padding: '2rem 0 1rem' }}>
						{post && post._id ? (
							<Typography variant='h6' gutterBottom>
								Related
							</Typography>
						) : (
							<Skeleton animation='wave' height={35} width='15%' />
						)}
						<div>
							{post && recommended_posts ? (
								<Grid container direction='row'>
									{recommended_posts.length > 0 &&
										recommended_posts
											.filter(x => x._id !== post._id)
											.map((x, index) =>
												index < 2 ? (
													<Grid item xs={12} md={6} key={x._id}>
														<PostItem post={x} />
													</Grid>
												) : null
											)}
								</Grid>
							) : (
								<Skeleton animation='wave' height={400} width='100%' />
							)}
						</div>
					</div>
				</Container>
			</Fragment>
		);
	}
}

const mapStateToProps = (state, props) => {
	const { list } = state.posts;

	const post = list.find(post => post._id === props.match.params.postId);
	const postTags = post ? post.tags.map(tag => tag.title) : null;

	// logic for retrieving related posts
	let relatedPosts = [];
	let junkPosts = [];
	for (let i = 0; i < list.length; i++) {
		for (let k = 0; k < list[i].tags.length; k++) {
			if (postTags.includes(list[i].tags[k].title)) {
				relatedPosts.push(list[i]);
			} else if (!_.any(junkPosts, e => _.isEqual(e, list[i]))) {
				junkPosts.push(list[i]);
			}
		}
	}

	const postSet = new Set(relatedPosts.concat(junkPosts));
	const recommended_posts = Array.from(postSet);

	return {
		post,
		recommended_posts,
		userId: state.auth.user.id
	};
};

export default connect(
	mapStateToProps,
	{ getPosts, votePost, savePost }
)(Post);
