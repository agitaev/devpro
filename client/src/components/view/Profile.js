import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Container,
	Paper,
	Grid,
	Typography,
	Divider,
	Button,
	Tab,
	Tabs
} from '@material-ui/core';
import { logoutUser } from '../../actions/authActions';
import {
	Link as RouterLink,
	Switch,
	Route,
	withRouter
} from 'react-router-dom';
import compose from 'recompose/compose';
import UserPosts from '../layout/UserPosts';
import UserComments from '../layout/UserComments';
import UserVotes from '../layout/UserVotes';
import UserFavorites from '../layout/UserFavorites';
import BackToHomeButton from '../chunks/BackToHomeButton';

class Profile extends Component {
	state = {
		self: false,
		user: {},
		elevation: 0,
		tabValue: 'settings'
	};

	onMouseOver = () => this.setState({ elevation: 2 });
	onMouseOut = () => this.setState({ elevation: 0 });

	componentDidMount() {
		const { auth, match } = this.props;
		const isUserPage = /[0-9a-fA-F]{24}/.test(match.url.split('/')[2]);
		const isSelf = isUserPage && match.url.split('/')[2] === auth.user.id;

		if ((auth.isAuthenticated && match.path === '/me') || isSelf) {
			this.setState({ self: true, user: auth.user });
		}
	}

	handleTabChange = (event, tabValue) => {
		this.setState({ tabValue });
	};

	render() {
		const { match } = this.props;
		const { user } = this.state;

		return (
			<Container maxWidth='lg' style={{ marginTop: '2rem' }}>
				<Grid container spacing={4} justify='space-between'>
					<Grid item md={3} xs={12}>
						<BackToHomeButton />
						<Paper
							elevation={this.state.elevation}
							onMouseOver={this.onMouseOver}
							onMouseOut={this.onMouseOut}
							style={{
								background: 'inherit',
								padding: '.75rem .75rem 1rem',
								marginTop: '2rem'
							}}
						>
							<Typography variant='h4'>{user.name}</Typography>
							<Typography variant='overline'>
								{user.username ? `@${user.username}` : ''}
							</Typography>
							<Divider style={{ margin: '1rem auto' }} />
							<Button
								variant='contained'
								color='primary'
								fullWidth
								onClick={() => this.props.logoutUser()}
							>
								sign out
							</Button>
						</Paper>
					</Grid>
					<Grid item md={9} xs={12}>
						<Paper style={{ marginBottom: '2rem' }}>
							<Tabs
								variant='fullWidth'
								value={this.state.tabValue}
								indicatorColor='primary'
								textColor='primary'
								onChange={this.handleTabChange}
								aria-label='disabled tabs example'
							>
								<Tab
									label='Settings'
									value='settings'
									component={RouterLink}
									to={match.url}
								/>
								<Tab
									label='Posts'
									value='posts'
									component={RouterLink}
									to={`${match.url}/posts`}
								/>
								<Tab
									label='Comments'
									value='comments'
									component={RouterLink}
									to={`${match.url}/comments`}
								/>
								<Tab
									label='Votes'
									value='votes'
									component={RouterLink}
									to={`${match.url}/votes`}
								/>
								<Tab
									label='Favorites'
									value='favorites'
									component={RouterLink}
									to={`${match.url}/favorites`}
								/>
							</Tabs>
						</Paper>
						<Switch>
							<Route exact path={match.path}>
								<h3>Settings</h3>
							</Route>
							<Route
								exact
								path={`${match.path}/posts`}
								render={routeProps => <UserPosts posts={user.saved_posts} />}
							/>
							<Route
								exact
								path={`${match.path}/comments`}
								component={UserComments}
							/>
							<Route exact path={`${match.path}/votes`} component={UserVotes} />
							<Route
								exact
								path={`${match.path}/favorites`}
								component={UserFavorites}
							/>
						</Switch>
					</Grid>
				</Grid>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default compose(
	connect(
		mapStateToProps,
		{ logoutUser }
	)
)(withRouter(Profile));
