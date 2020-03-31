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
			<Grid container justify='space-evenly' spacing={1}>
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

	if (searchText !== '') {
		return {
			posts: list.filter(post => post.title.includes(searchText))
		};
	} else {
		return {
			posts: list
		};
	}
};

export default connect(
	mapStateToProps,
	{ getPosts }
)(PostList);
