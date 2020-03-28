import React, { Component } from 'react';
import {
	Container,
	TextField,
	Grid,
	Typography,
	Button,
	Snackbar
} from '@material-ui/core';
import _ from 'underscore';
import compose from 'recompose/compose';
import BackToHomeButton from '../chunks/BackToHomeButton';
import Alert from '../chunks/Alert';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createPost } from '../../actions/postActions';
import { Autocomplete } from '@material-ui/lab';

class CreatePost extends Component {
	state = {
		title: '',
		subtitle: '',
		body: '',
		tags: '',
		errors: {},
		showSnackbar: false,
		snackbarTimer: 3
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = async e => {
		e.preventDefault();
		const tags =
			this.state.tags.length === 1 && this.state.tags[0] === ''
				? []
				: this.state.tags.split(',').map(tag => tag.trim());

		const post = {
			title: this.state.title,
			subtitle: this.state.subtitle,
			body: this.state.body,
			author: this.props.auth.user.id,
			tags
		};

		this.props.createPost(post, this.props.history);
		this.setState({ showSnackbar: true });

		await setInterval(() => {
			if (this.state.snackbarTimer === 1) {
				clearInterval();
				this.setState({ showSnackbar: false });
			} else {
				this.setState({ snackbarTimer: this.state.snackbarTimer - 1 });
			}
		}, 1000);
	};

	render() {
		const {
			title,
			subtitle,
			body,
			tags,
			errors,
			showSnackbar,
			snackbarTimer
		} = this.state;

		return (
			<Container maxWidth='lg' style={{ margin: '4rem auto 10rem' }}>
				{_.isEmpty(errors) ? (
					<Snackbar
						style={{ top: '60px' }}
						open={showSnackbar}
						anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					>
						<Alert severity='success'>
							Success! You will be redirected in {snackbarTimer}...
						</Alert>
					</Snackbar>
				) : (
					<Snackbar
						style={{ top: '60px' }}
						open={showSnackbar}
						anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					>
						<Alert severity='warning'>Validation error occured!</Alert>
					</Snackbar>
				)}
				<Grid container justify='center'>
					<Grid item xs={12} sm={10} md={8}>
						<BackToHomeButton />
						<Typography
							variant='h4'
							gutterBottom
							style={{ padding: '2rem 0 1rem' }}
						>
							Have a project idea?
						</Typography>
						<form noValidate onSubmit={this.onSubmit}>
							<div style={{ padding: '.5rem 0' }}>
								<Typography variant='h6' gutterBottom>
									Title
								</Typography>
								<TextField
									size='small'
									variant='outlined'
									type='text'
									fullWidth
									id='title'
									value={title}
									onChange={this.onChange}
									label={
										title
											? ''
											: 'e.g. VSCode extension to track time spent on project'
									}
									InputLabelProps={{ shrink: false }}
									helperText={
										errors.title
											? errors.title
											: 'Specify the idea of a project as clearly as possible'
									}
									error={errors.title ? true : false}
								/>
							</div>
							<div style={{ padding: '.5rem 0' }}>
								<Typography variant='h6' gutterBottom>
									Subtitle
									<span
										style={{
											color: 'grey',
											fontSize: '1rem',
											fontWeight: 'normal',
											verticalAlign: 'text-top'
										}}
									>
										&nbsp;-&nbsp;optional
									</span>
								</Typography>
								<TextField
									size='small'
									variant='outlined'
									fullWidth
									type='text'
									id='subtitle'
									value={subtitle}
									onChange={this.onChange}
									InputLabelProps={{ shrink: false }}
									helperText={
										errors.subtitle
											? errors.subtitle
											: 'An overview of the project, a.k.a. TL;DR'
									}
									error={errors.subtitle ? true : false}
								/>
							</div>
							<div style={{ padding: '.5rem 0' }}>
								<Typography variant='h6' gutterBottom>
									Body
								</Typography>
								<TextField
									size='small'
									variant='outlined'
									rows={10}
									rowsMax={10}
									fullWidth
									multiline
									id='body'
									value={body}
									onChange={this.onChange}
									InputLabelProps={{ shrink: false }}
									helperText={
										errors.body
											? errors.body
											: 'Describe the project in details, include functional requirements'
									}
									error={errors.body ? true : false}
								/>
							</div>
							<div style={{ padding: '.5rem 0' }}>
								<Typography variant='h6' gutterBottom>
									Tags
								</Typography>
								{/*<TextField
									size='small'
									variant='outlined'
									fullWidth
									type='text'
									id='tags'
									value={tags}
									onChange={this.onChange}
									InputLabelProps={{ shrink: false }}
									helperText={
										errors.tags
											? errors.tags
											: 'Add up to 4 tags separated by comma to describe the stack'
									}
									error={errors.tags ? true : false}
								/>*/}
								<Autocomplete
									multiple
									id='tags'
									options={[
										{ title: 'this is title' },
										{ title: 'this is another title' }
									]}
									getOptionLabel={option => option.title}
									renderInput={params => (
										<TextField
											{...params}
											size='small'
											variant='outlined'
											fullWidth
											InputLabelProps={{ shrink: false }}
											helperText={
												errors.tags
													? errors.tags
													: 'Add up to 4 tags separated by comma to describe the stack'
											}
											error={errors.tags ? true : false}
										/>
									)}
								/>
							</div>
							<Button
								type='submit'
								variant='contained'
								style={{ marginTop: '1rem', float: 'right' }}
								size='large'
								color='primary'
							>
								Send to moderation
							</Button>
						</form>
					</Grid>
				</Grid>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default compose(
	connect(
		mapStateToProps,
		{ createPost }
	)
)(withRouter(CreatePost));
