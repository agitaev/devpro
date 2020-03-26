import React, { Component, Fragment } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import TrendingItem from './TrendingItem';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class TrendingList extends Component {
	state = {
		posts: []
	};

	componentDidMount() {
		axios
			.get('/api/posts/trending')
			.then(res => this.setState({ posts: res.data }))
			.catch(err => console.error(err));
	}

	render() {
		return (
			<Fragment>
				<Typography variant='subtitle1' gutterBottom>
					Trending posts
				</Typography>
				<Paper style={{ marginBottom: '1rem' }}>
					<Grid container justify='space-between'>
						{this.state.posts && this.state.posts.length > 0
							? this.state.posts.map((post, index) =>
									index < 5 ? (
										<Grid key={post._id} item xs={12}>
											<TrendingItem post={post} />
										</Grid>
									) : null
							  )
							: null}
					</Grid>
				</Paper>
			</Fragment>
		);
	}
}

export default TrendingList;
