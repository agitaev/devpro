import React, { Component } from 'react';
import { Hidden, Typography, Container } from '@material-ui/core';
import TrendingList from '../sidebar/TrendingList';
import TagList from '../sidebar/TagList';
import { connect } from 'react-redux';

class TrendingBoard extends Component {
	render() {
		return (
			<Container style={{ margin: '2rem auto 5rem' }}>
				<Hidden mdUp>
					<TrendingList />
					{this.props.isAuthenticated ? <TagList /> : null}
				</Hidden>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth
});

export default connect(mapStateToProps)(TrendingBoard);
