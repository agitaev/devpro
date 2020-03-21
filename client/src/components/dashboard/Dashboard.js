import React, { Component } from 'react';

import { Container } from '@material-ui/core';
import PostList from './PostList';

class Dashboard extends Component {
	render() {
		// const { user } = this.props.auth;

		return (
			<Container maxWidth='lg' style={{ marginBottom: '5rem' }}>
				<PostList />
			</Container>
		);
	}
}

export default Dashboard;
