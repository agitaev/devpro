import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { getTags } from '../../actions/tagActions';
import {
	Container,
	Grid,
	Button,
	Typography,
	TextField,
	Chip
} from '@material-ui/core';
import BackToHomeButton from '../element/BackToHomeButton';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			username: '',
			password: '',
			passwordVerification: '',
			followed_tags: [],
			populated_tags: [],
			errors: {}
		};
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		} else {
			// populate tags
			this.props.getTags();
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.tags) {
			this.setState({
				populated_tags: nextProps.tags
			});
		}
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			username: this.state.username,
			password: this.state.password,
			passwordVerification: this.state.passwordVerification,
			followed_tags: this.state.followed_tags
		};

		this.props.registerUser(newUser, this.props.history);
	};

	onSelectTag = tag => () => {
		const followed_tags = this.state.followed_tags.concat(tag._id);
		this.setState({ followed_tags });
	};

	onDeleteTag = tag => () => {
		const followed_tags = this.state.followed_tags.filter(x => x !== tag._id);
		this.setState({ followed_tags });
	};

	render() {
		const { errors, populated_tags, followed_tags } = this.state;

		return (
			<Container style={{ margin: '4rem auto' }}>
				<Grid container justify='center'>
					<Grid item xs={10} sm={8} md={6} lg={5}>
						<BackToHomeButton />
						<div style={{ margin: '1.5rem 0 1rem' }}>
							<Typography variant='h4'>
								<strong>Register</strong>&nbsp;below
							</Typography>
							<Typography variant='subtitle1'>
								Already have an account?{' '}
								<Link
									to='/login'
									style={{ textDecoration: 'none', color: 'primary' }}
								>
									Sign in instead.
								</Link>
							</Typography>
						</div>
						<form noValidate onSubmit={this.onSubmit}>
							<TextField
								size='small'
								style={{ margin: '.5rem 0' }}
								variant='outlined'
								fullWidth
								onChange={this.onChange}
								id='name'
								label='Name'
								type='text'
								value={this.state.name}
								error={errors.name ? true : false}
								helperText={errors.name}
							/>
							<TextField
								size='small'
								style={{ margin: '.5rem 0' }}
								variant='outlined'
								fullWidth
								onChange={this.onChange}
								id='username'
								label='Username'
								type='text'
								value={this.state.username}
								error={errors.username ? true : false}
								helperText={errors.username}
							/>
							<TextField
								size='small'
								style={{ margin: '.5rem 0' }}
								variant='outlined'
								fullWidth
								onChange={this.onChange}
								value={this.state.email}
								id='email'
								type='email'
								label='Email address'
								error={errors.email ? true : false}
								helperText={errors.email}
							/>
							<TextField
								size='small'
								style={{ margin: '.5rem 0' }}
								variant='outlined'
								fullWidth
								onChange={this.onChange}
								value={this.state.password}
								id='password'
								type='password'
								label='Password'
								error={errors.password ? true : false}
								helperText={errors.password}
							/>
							<TextField
								size='small'
								style={{ margin: '.35rem 0' }}
								variant='outlined'
								fullWidth
								onChange={this.onChange}
								value={this.state.passwordVerification}
								id='passwordVerification'
								type='password'
								label='Verify password'
								error={errors.passwordVerification ? true : false}
								helperText={errors.passwordVerification}
							/>
							<div style={{ margin: '1.5rem 0 1rem' }}>
								<Typography variant='subtitle1' style={{ lineHeight: '1.25' }}>
									What technologies are you interested in?
								</Typography>
								<Typography variant='caption' color='error'>
									{errors.followed_tags}
								</Typography>
								<Grid
									container
									spacing={1}
									justify='center'
									style={{ paddingTop: '.75rem' }}
								>
									{populated_tags && populated_tags !== undefined
										? populated_tags.map(tag => (
												<Grid item key={tag._id}>
													<Chip
														color={
															followed_tags.includes(tag._id)
																? 'primary'
																: undefined
														}
														label={tag.title}
														onClick={this.onSelectTag(tag)}
														onDelete={
															followed_tags.includes(tag._id)
																? this.onDeleteTag(tag)
																: undefined
														}
													/>
												</Grid>
										  ))
										: null}
								</Grid>
							</div>
							<Button
								type='submit'
								variant='contained'
								style={{ marginTop: '1rem', float: 'right' }}
								size='large'
								color='primary'
							>
								Sign up
							</Button>
						</form>
					</Grid>
				</Grid>
			</Container>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	tags: state.tags
		// sort alphabetically
		.sort((x, y) => (x.title < y.title ? -1 : x.title > y.title ? 1 : 0))
});

export default compose(
	connect(
		mapStateToProps,
		{ registerUser, getTags }
	)
)(withRouter(Register));
