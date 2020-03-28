import React, { Component } from 'react';
import { Paper, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

class PostItemSkeleton extends Component {
	state = {
		elevation: 0
	};

	onMouseOver = () => this.setState({ elevation: 5 });
	onMouseOut = () => this.setState({ elevation: 0 });

	render() {
		return (
			<Paper
				style={{
					padding: '1.4rem',
					backgroundColor: 'inherit'
				}}
				elevation={this.state.elevation}
				onMouseOver={this.onMouseOver}
				onMouseOut={this.onMouseOut}
			>
				<Grid container alignItems='center' style={{ marginBottom: '1rem' }}>
					<Skeleton
						animation='wave'
						height={13}
						width={75}
						style={{ marginBottom: 6, marginRight: '70%', flex: 1 }}
					/>
					<Skeleton variant='circle' animation='wave' height={30} width={30} />
				</Grid>
				<Grid
					container
					direction='row'
					justify='space-between'
					alignItems='flex-start'
				>
					<Grid item style={{ paddingRight: '.5rem', flex: 1 }}>
						<Skeleton animation='wave' height={20} width='70%' />
						<Skeleton
							animation='wave'
							height={20}
							width='40%'
							style={{ marginBottom: '1rem' }}
						/>
						<Skeleton animation='wave' height={15} />
						<Skeleton animation='wave' height={15} width='75%' />
						<Skeleton
							animatino='wave'
							height={13}
							width='40%'
							style={{ margin: '1rem 0' }}
						/>
						<Skeleton
							variant='rect'
							animation='wave'
							width='80%'
							style={{ marginBottom: '.25rem' }}
						/>
						<Skeleton variant='rect' animation='wave' width='50%' />
					</Grid>
					<Skeleton variant='rect' animation='wave' height={50} width={30} />
				</Grid>
			</Paper>
		);
	}
}

export default PostItemSkeleton;
