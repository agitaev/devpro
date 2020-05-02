import React, { Component } from 'react';
import { Container, Grid, Hidden, Snackbar } from '@material-ui/core';
import PostList from './PostList';
import TagList from '../sidebar/TagList';
import TrendingList from '../sidebar/TrendingList';
import { connect } from 'react-redux';
import Alert from '../chunks/Alert';

class Dashboard extends Component {
	state = {
		showSnackbar: false,
		email: '',
	};

	componentDidMount() {
		if (this.props.history.action === 'PUSH' && this.props.location.state) {
			const { email, fromlocation } = this.props.location.state;

			if (email && fromlocation === '/register') {
				this.setState({ showSnackbar: true, email });
			}
		}
	}

	handleCloseSnackbar = () => {
		this.setState({ showSnackbar: false });
	};

	render() {
		const { showSnackbar, email } = this.state;

		return (
			<Container style={{ margin: '0 auto 5rem', padding: 0 }}>
				{showSnackbar ? (
					<Snackbar
						style={{ top: '60px' }}
						open={showSnackbar}
						onClose={this.handleCloseSnackbar}
						autoHideDuration={4000}
						anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					>
						<Alert severity='info'>Confirmation email is sent to {email}</Alert>
					</Snackbar>
				) : null}
				<Grid container style={{ margin: 0, width: '100%' }} spacing={2}>
					<Grid item sm={12} md={9}>
						<PostList />
					</Grid>
					<Grid item md={3} style={{ marginTop: '1rem' }}>
						<Hidden smDown>
							<TrendingList />
							{this.props.isAuthenticated ? <TagList /> : null}
						</Hidden>
					</Grid>
				</Grid>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Dashboard);
