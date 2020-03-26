import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import PostItem from './PostItem';

class PostList extends Component {
	state = {
		posts: [],
		isLoading: true
	};

	componentDidMount() {
		if (
			!(
				JSON.parse(localStorage.getItem('posts')) &&
				JSON.parse(localStorage.getItem('posts')).length > 0
			)
		) {
			this.props.getPosts();
		} else {
			// temporary solution
			this.props.getPosts();

			const posts = JSON.parse(localStorage.getItem('posts'));
			this.setState({ posts });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { posts } = this.props;
		if (prevProps.posts !== posts) {
			this.setState({ posts });
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.posts) {
			this.setState({ posts: nextProps.posts });
		}
	}

	render() {
		const { posts } = this.state;
		return (
			<Grid container justify='space-evenly' spacing={1}>
				{posts && posts !== undefined
					? posts.map((post, id) => (
							<Grid item xs={12} sm={6} lg={4} key={id}>
								<PostItem post={post} withVoteController />
							</Grid>
					  ))
					: null}
			</Grid>
		);
	}
}

PostList.propTypes = {
	getPosts: PropTypes.func.isRequired,
	posts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	posts: state.posts
});

export default connect(
	mapStateToProps,
	{ getPosts }
)(PostList);
