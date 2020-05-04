import React, { useState } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import { postComment } from '../../actions/commentActions';
import { connect } from 'react-redux';

const CommentForm = ({ author, post, postComment }) => {
	const [body, setBody] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = { body, author, post };

		postComment(data);
		setBody('');
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
						Send
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

const mapStateToProps = (state) => ({
	author: state.auth.user,
});

export default connect(
	mapStateToProps,
	{ postComment }
)(CommentForm);
