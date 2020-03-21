import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import {
	Container,
	Grid,
	Button,
	Typography,
	TextField
} from '@material-ui/core';
import BackToHomeButton from '../element/BackToHomeButton';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			passwordVerification: '',
			errors: {}
		};
	}

	componentDidMount() {
		// If logged in and user navigates to Register page, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
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
			password: this.state.password,
			passwordVerification: this.state.passwordVerification
		};

		this.props.registerUser(newUser, this.props.history);
	};

	render() {
		const { errors } = this.state;

		return (
			<Container style={{ margin: '4rem 0' }}>
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
	errors: state.errors
});

export default compose(
	connect(
		mapStateToProps,
		{ registerUser }
	)
)(withRouter(Register));
