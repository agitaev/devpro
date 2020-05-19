import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
	Container,
	Paper,
	Grid,
	Typography,
	Divider,
	Button,
	Tab,
	Tabs,
} from '@material-ui/core';
import { logoutUser } from '../../actions/authActions';
import {
	Link as RouterLink,
	Switch,
	Route,
	withRouter,
} from 'react-router-dom';
import compose from 'recompose/compose';
import BackToHomeButton from '../chunks/BackToHomeButton';
import UserPosts from '../layout/UserPosts';
import UserComments from '../layout/UserComments';
import UserVotes from '../layout/UserVotes';
import UserFavorites from '../layout/UserFavorites';
import UserSettings from '../layout/UserSettings';
import axios from 'axios';

class Profile extends Component {
	state = {
		self: false,
		user: {},
		elevation: 0,
		tabValue: 'settings',
	};

	onMouseOver = () => this.setState({ elevation: 2 });
	onMouseOut = () => this.setState({ elevation: 0 });

	componentDidMount() {
		const { auth, match } = this.props;
		const isUserPage = /[0-9a-fA-F]{24}/.test(match.url.split('/')[2]);
		const isSelf = isUserPage && match.url.split('/')[2] === auth.user.id;

		if ((auth.isAuthenticated && match.path === '/me') || isSelf) {
			this.setState({ self: true, user: auth.user });
		} else if (isUserPage) {
			axios
				.get(`/api/users/${match.params.userId}`)
				.then((res) => this.setState({ user: res.data }))
				.catch((err) => console.log(err));
		}
	}

	handleTabChange = (event, tabValue) => {
		this.setState({ tabValue });
	};

	render() {
		const { match } = this.props;
		const { user, self } = this.state;

		return (
			<Container
				maxWidth='lg'
				style={{ marginTop: '2rem', marginBottom: '6rem' }}
			>
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
								marginTop: '2rem',
							}}
						>
							<Typography variant='h4'>{user.name}</Typography>
							<Typography variant='overline'>
								{user.username ? `@${user.username}` : ''}
							</Typography>
							<Divider style={{ margin: '1rem auto' }} />
							{self ? (
								<Button
									variant='contained'
									color='primary'
									fullWidth
									onClick={() => this.props.logoutUser()}
								>
									sign out
								</Button>
							) : (
								<Button variant='contained' color='primary' fullWidth>
									follow
								</Button>
							)}
						</Paper>
					</Grid>
					<Grid item md={9} xs={12}>
						{self && (
							<Fragment>
								<Paper style={{ marginBottom: '2rem' }}>
									<Tabs
										variant='scrollable'
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
									<Route
										exact
										path={`${match.path}/`}
										render={(routeProps) => <UserSettings />}
									/>
									<Route
										exact
										path={`${match.path}/posts`}
										render={(routeProps) => (
											<UserPosts posts={user.created_posts} />
										)}
									/>
									<Route
										exact
										path={`${match.path}/comments`}
										render={(routeProps) => (
											<UserComments comments={user.comments} />
										)}
									/>
									<Route
										exact
										path={`${match.path}/votes`}
										render={(routeProps) => (
											<UserVotes posts={user.voted_posts} />
										)}
									/>
									<Route
										exact
										path={`${match.path}/favorites`}
										render={(routeProps) => (
											<UserFavorites posts={user.saved_posts} />
										)}
									/>
								</Switch>
							</Fragment>
						)}
					</Grid>
				</Grid>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default compose(
	connect(
		mapStateToProps,
		{ logoutUser }
	)
)(withRouter(Profile));
