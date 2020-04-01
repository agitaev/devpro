import React, { Component, Fragment } from 'react';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import PostItem from './PostItem';
import PostItemSkeleton from '../../skeletons/PostItemSkeleton';
import _ from 'underscore';

class PostList extends Component {
	componentDidMount() {
		this.props.getPosts();
	}

	render() {
		const { posts } = this.props;
		const skeletons = [];
		_.times(9, index =>
			skeletons.push(
				<Grid item xs={12} sm={6} lg={4} key={index}>
					<PostItemSkeleton />
				</Grid>
			)
		);

		return (
			<Grid
				container
				justify='space-evenly'
				style={{ margin: 0, width: '100%' }}
			>
				{posts && posts !== undefined && posts.length > 0 ? (
					posts.map((post, id) => (
						<Grid item xs={12} sm={6} lg={4} key={id}>
							<PostItem post={post} withVoteController />
						</Grid>
					))
				) : (
					<Fragment>{skeletons}</Fragment>
				)}
			</Grid>
		);
	}
}

PostList.propTypes = {
	getPosts: PropTypes.func.isRequired,
	posts: PropTypes.array.isRequired
};

const mapStateToProps = state => {
	const { list, searchText } = state.posts;
	const { allow_personalized_feed } = state.auth.user;

	if (searchText !== '') {
		return {
			posts: list.filter(post => post.title.includes(searchText))
		};
	} else if (allow_personalized_feed) {
		const userTags = state.auth.user.followed_tags.map(tag => tag.title);

		// logic for retrieving personalized feed
		let personalizedPosts = [];
		let junkPosts = [];
		for (let i = 0; i < list.length; i++) {
			for (let k = 0; k < list[i].tags.length; k++) {
				if (userTags.includes(list[i].tags[k].title)) {
					personalizedPosts.push(list[i]);
				} else if (!_.any(junkPosts, e => _.isEqual(e, list[i]))) {
					junkPosts.push(list[i]);
				}
			}
		}

		const postSet = new Set(personalizedPosts.concat(junkPosts));
		const posts = Array.from(postSet);
		return {
			posts
		};
	} else {
		return { posts: list };
	}
};

export default connect(
	mapStateToProps,
	{ getPosts }
)(PostList);
