import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import {
	Container,
	Grid,
	Button,
	Typography,
	TextField
} from '@material-ui/core';
import { ArrowBackIosOutlined as BackIcon } from '@material-ui/icons';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errors: {}
		};
	}

	componentDidMount() {
		// If logged in and user navigates to Login page, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/dashboard'); // push user to dashboard when they login
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

		const userData = {
			email: this.state.email,
			password: this.state.password
		};

		this.props.loginUser(userData);
		// since we handle the redirect within our component,
		// we don't need to pass in this.props.history as a parameter
	};

	render() {
		const { errors } = this.state;

		return (
			<Container style={{ marginTop: '4rem' }}>
				<Grid container justify='center'>
					<Grid item xs={10} sm={8} md={6} lg={5}>
						<Button
							color='inherit'
							startIcon={<BackIcon />}
							component={Link}
							to='/'
						>
							Back to home
						</Button>
						<div style={{ margin: '1.5rem 0 1rem' }}>
							<Typography variant='h4'>
								<strong>Login</strong>&nbsp;below
							</Typography>
							<Typography variant='subtitle1'>
								Don't have an account? <Link to='/register'>Sign Up</Link>
							</Typography>
						</div>
						<form noValidate onSubmit={this.onSubmit}>
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
								error={errors.email || errors.emailnotfound ? true : false}
								helperText={errors.email || errors.emailnotfound}
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
								error={
									errors.password || errors.passwordincorrect ? true : false
								}
								helperText={errors.password || errors.passwordincorrect}
							/>
							<Button
								type='submit'
								variant='contained'
								style={{ marginTop: '1rem', float: 'right' }}
								size='large'
								color='primary'
							>
								Sign in
							</Button>
						</form>
					</Grid>
				</Grid>
			</Container>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ loginUser }
)(Login);
