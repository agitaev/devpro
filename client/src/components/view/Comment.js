import React, { Fragment } from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import dayjs from 'dayjs';

const Comment = ({ comment }) => {
	const { author } = comment;
	return (
		<Fragment>
			<Typography variant='subtitle1'>
				{author.name} |{' '}
				{dayjs(comment.created_at).format('MMM D, YYYY hh:mm A')}:
			</Typography>
			<Typography
				variant='body1'
				gutterBottom
				style={{
					padding: '.25rem 1rem',
					margin: '.75rem auto',
					borderLeft: '3px solid #0e0e0e',
				}}
			>
				{comment.body}
			</Typography>
			<Divider />
		</Fragment>
	);
};

export default Comment;
