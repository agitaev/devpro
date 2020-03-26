import React from 'react';
import { Paper, Typography, Grid, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';

const UserPost = props => {
	const { post } = props;

	return (
		<div style={{ marginTop: '1rem' }}>
			<Typography variant='subtitle2' gutterBottom>
				{moment(post.created_at).format('MMM D')}
			</Typography>
			<Paper style={{ padding: '.5rem' }}>
				<Grid container direction='row' spacing={2}>
					<Grid
						container
						justify='center'
						alignItems='center'
						direction='column'
						item
						xs={3}
						sm={2}
						lg={1}
						style={{ background: '#f4f4f4' }}
					>
						<Typography variant='body2'>updoots</Typography>
						<Typography variant='h4'>{post.vote_count}</Typography>
					</Grid>
					<Grid item xs={7} sm={8} lg={9}>
						<Typography variant='h6'>{post.title}</Typography>
						<Typography variant='subtitle1' noWrap>
							{post.subtitle}
						</Typography>
					</Grid>
					<Grid container item xs={2} justify='center' alignItems='center'>
						<Button
							size='large'
							variant='contained'
							color='primary'
							component={RouterLink}
							to={`/posts/${post._id}`}
						>
							view
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default UserPost;
