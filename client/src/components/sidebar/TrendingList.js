import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
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

	componentDidUpdate() {}

	render() {
		console.log(window.innerWidth);
		if (window.innerWidth > 959) {
			return <Redirect to='/' />;
		}

		return (
			<Grid
				container
				style={{ paddingBottom: '1rem' }}
				spacing={1}
				justify='space-between'
			>
				{this.state.posts && this.state.posts.length > 0
					? this.state.posts.map((post, index) =>
							index < 10 ? (
								<Grid key={post._id} item xs={12} sm={6} md={6} lg={12}>
									<TrendingItem post={post} />
								</Grid>
							) : null
					  )
					: null}
			</Grid>
		);
	}
}

export default TrendingList;
