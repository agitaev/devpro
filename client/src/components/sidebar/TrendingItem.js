import React, { Component } from 'react';
import { Paper, Typography, Grid } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

class TrendingItem extends Component {
	state = {
		elevation: 0
	};

	onMouseOver = () => this.setState({ elevation: 5 });
	onMouseOut = () => this.setState({ elevation: 0 });

	render() {
		const { post } = this.props;
		return (
			<Paper
				style={{ padding: '.5rem', background: 'inherit' }}
				elevation={this.state.elevation}
				onMouseOver={this.onMouseOver}
				onMouseOut={this.onMouseOut}
			>
				<Grid container spacing={1} alignItems='center'>
					<Grid item xs={4} sm={4}>
						<img
							src='https://via.placeholder.com/400x300'
							style={{ width: '100%', height: 'auto', display: 'block' }}
							alt='meaningful text'
						/>
					</Grid>
					<Grid container item xs={8} sm={8} direction='column'>
						<Typography
							gutterBottom
							component={RouterLink}
							variant='subtitle1'
							to={`/posts/${post._id}`}
							style={{
								fontSize: '.85rem',
								textDecoration: 'none',
								lineHeight: 'normal',
								display: 'block'
							}}
							color='inherit'
						>
							{post.title}
						</Typography>
						{post.author ? (
							<Typography
								variant='caption'
								color='textSecondary'
								component={RouterLink}
								to={`/users/${post.author._id}`}
								style={{ textDecoration: 'none' }}
							>
								{post.author.name}
							</Typography>
						) : null}
					</Grid>
				</Grid>
			</Paper>
		);
	}
}

export default TrendingItem;
