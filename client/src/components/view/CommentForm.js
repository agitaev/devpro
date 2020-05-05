import React, { useState } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import { postComment } from '../../actions/commentActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const CommentForm = ({
	author,
	post,
	isAuthenticated,
	history,
	postComment,
}) => {
	const [body, setBody] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isAuthenticated) {
			const data = { body, author, post };

			postComment(data);
			setBody('');
		} else {
			history.push('/login');
		}
	};

	return (
		<form
			noValidate
			onSubmit={handleSubmit}
			style={{ marginBottom: '1rem', minWidth: '100%' }}
		>
			<Grid
				container
				alignItems='center'
				justify='space-between'
				direction='row'
				spacing={1}
			>
				<Grid item style={{ flex: 1 }}>
					<TextField
						size='small'
						variant='outlined'
						placeholder='Comment'
						value={body}
						onChange={(e) => setBody(e.target.value)}
						rows={1}
						rowsMax={3}
						id='body'
						InputLabelProps={{ shrink: false }}
						helperText=''
						fullWidth
						multiline
					/>
				</Grid>
				<Grid item>
					<Button
						type='submit'
						variant='contained'
						size='large'
						color='primary'
					>
						Send to moderation
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

const mapStateToProps = (state) => ({
	author: state.auth.user,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
	mapStateToProps,
	{ postComment }
)(withRouter(CommentForm));
