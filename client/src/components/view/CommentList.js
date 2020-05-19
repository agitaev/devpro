import React from 'react';
import { Grid } from '@material-ui/core';
import Comment from './Comment';

const CommentList = ({ comments }) => {
	return (
		<Grid container justify='center' direction='column'>
			{comments !== undefined &&
				comments.length > 0 &&
				comments.map((comment) => {
					return (
						<Grid item style={{ marginTop: '1rem' }} key={comment._id}>
							<Comment comment={comment} />
						</Grid>
					);
				})}
		</Grid>
	);
};

export default CommentList;
