import React, { Component } from 'react';

import { Container, Grid, Typography, Hidden } from '@material-ui/core';
import PostList from './PostList';
import TagList from '../sidebar/TagList';
import TrendingList from '../sidebar/TrendingList';
import { connect } from 'react-redux';

class Dashboard extends Component {
	render() {
		// const { user } = this.props.auth;

		return (
			<Container style={{ margin: '2rem auto 5rem' }}>
				<Grid container spacing={2}>
					<Grid item lg={9}>
						<PostList />
					</Grid>
					<Grid item lg={3}>
						<Hidden mdDown>
							<Typography variant='subtitle1' gutterBottom>
								Trending posts
							</Typography>
							<TrendingList />
							{this.props.isAuthenticated ? <TagList /> : null}
						</Hidden>
					</Grid>
				</Grid>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Dashboard);
