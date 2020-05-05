import React from 'react';
import { Paper, Typography, Grid, Button, IconButton } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const UserComment = ({ comment }) => {
	return (
		<div style={{ marginTop: '1rem' }}>
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
						<Typography
							variant='h6'
							component={RouterLink}
							to={`/comments/${comment._id}`}
							style={{ color: 'inherit', textDecoration: 'none' }}
						>
							Thread
						</Typography>
					</Grid>
					<Grid item xs={7} sm={8} lg={9}>
						<Typography variant='h6'>RE: </Typography>
						<Typography variant='subtitle1' noWrap>
							{comment.body}
						</Typography>
					</Grid>
					<Grid container item xs={2} justify='center' alignItems='center'>
						<Button
							size='large'
							variant='contained'
							color='primary'
							component={RouterLink}
							to={`/comments/${comment._id}`}
						>
							view
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default UserComment;
