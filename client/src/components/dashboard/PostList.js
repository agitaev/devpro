import React, { Component, Fragment } from 'react';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import PostItem from './PostItem';
import PostItemSkeleton from '../../skeletons/PostItemSkeleton';
import _ from 'underscore';

class PostList extends Component {
	state = {
		posts: []
	};

	componentDidMount() {
		if (localStorage.getItem('posts')) {
			this.setState({
				posts: JSON.parse(localStorage.getItem('posts'))
			});
		}

		this.props.getPosts();
	}

	componentDidUpdate(prevProps, prevState) {
		const { posts } = this.props;
		if (prevProps.posts !== posts) {
			this.setState({ posts, isLoading: false });
		}
	}

	render() {
		const { posts } = this.state;
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

	return {
		posts: list.filter(post => post.title.includes(searchText))
	};
};

export default connect(
	mapStateToProps,
	{ getPosts }
)(PostList);
