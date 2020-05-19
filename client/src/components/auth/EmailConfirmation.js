import React, { Component } from 'react';
import { Paper, Container, Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { confirmUserEmail } from '../../actions/authActions';
import { DoneAllOutlined as SuccessIcon } from '@material-ui/icons';

class EmailConfirmation extends Component {
	state = {
		email: '',
	};

	componentDidMount() {
		if (!this.props.isAuthenticated) {
			const params = new URLSearchParams(this.props.location.search);
			const token = params.get('token');
			const email = params.get('email');

			if (token && email) {
				this.setState({ email });
				confirmUserEmail(token);
			}
		} else {
			this.props.history.push('/');
		}
	}

	render() {
		return (
			<Container maxWidth='md'>
				<Paper style={{ marginTop: '4rem', padding: '1.5rem 3rem' }}>
					<Grid
						container
						justify='space-between'
						alignItems='center'
						direction='row'
					>
						<Grid item xs={2}>
							<SuccessIcon style={{ fontSize: '3rem' }} />
						</Grid>
						<Grid item xs={10}>
							<Typography variant='subtitle1'>
								Email {this.state.email} is successfully verified! You can close
								this tab safely.
							</Typography>
						</Grid>
					</Grid>
				</Paper>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(EmailConfirmation);
