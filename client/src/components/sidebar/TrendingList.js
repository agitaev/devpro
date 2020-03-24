import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import TrendingItem from './TrendingItem';

class TrendingList extends Component {
	render() {
		return (
			<Grid
				container
				style={{ paddingBottom: '1rem' }}
				spacing={1}
				justify='space-between'
			>
				<Grid item xs={12} sm={6} md={6} lg={12}>
					<TrendingItem />
				</Grid>
				<Grid item xs={12} sm={6} md={6} lg={12}>
					<TrendingItem />
				</Grid>
			</Grid>
		);
	}
}

export default TrendingList;
