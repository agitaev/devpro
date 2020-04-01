import React, { Component, Fragment } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import TrendingItem from './TrendingItem';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import _ from 'underscore';

class TrendingList extends Component {
	state = {
		posts: [],
		isLoading: true
	};

	componentDidMount() {
		this.props.getPosts();
	}

	static getDerivedStateFromProps(props, state) {
		if (props.posts) {
			return { posts: props.posts };
		}
	}

	render() {
		const { isLoading } = this.state;
		const skeletons = [];
		_.times(4, index => {
			skeletons.push(
				<Fragment key={index}>
					<br />
					<Skeleton
						animation='wave'
						width='75%'
						height={30}
						style={{ marginLeft: '.5rem' }}
					/>
					<Skeleton
						animation='wave'
						width='35%'
						height={30}
						style={{ marginLeft: '.5rem', paddingBottom: '1rem' }}
					/>
					<br />
				</Fragment>
			);
		});

		return (
			<Fragment>
				{isLoading ? (
					<Skeleton
						animation='wave'
						width='20%'
						style={{ marginBottom: '.5rem' }}
					/>
				) : (
					<Typography variant='subtitle1' gutterBottom>
						Trending posts
					</Typography>
				)}
				<Paper style={{ marginBottom: '1rem' }}>
					{isLoading ? (
						<Fragment>{skeletons}</Fragment>
					) : (
						<Grid container justify='space-between'>
							{this.props.posts && this.props.posts.length > 0
								? this.props.posts.map((post, index) =>
										index < 5 ? (
											<Grid key={post._id} item xs={12}>
												<TrendingItem post={post} />
											</Grid>
										) : null
								  )
								: null}
						</Grid>
					)}
				</Paper>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	posts: state.posts.list.sort((x, y) =>
		x.vote_count < y.vote_count ? 1 : x.vote_count > y.vote_count ? -1 : 0
	)
});

export default connect(
	mapStateToProps,
	{ getPosts }
)(TrendingList);
