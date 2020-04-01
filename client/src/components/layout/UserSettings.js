import React, { Fragment, useState, useEffect } from 'react';
import { Grid, Typography, Switch } from '@material-ui/core';
import { connect } from 'react-redux';
import {
	switchAllowDarkMode,
	switchAllowNotification,
	switchAllowPersonalizedFeed
} from '../../actions/userActions';

const UserSettings = ({
	notifications,
	feed,
	darkMode,
	switchAllowDarkMode,
	switchAllowNotification,
	switchAllowPersonalizedFeed,
	userId
}) => {
	const [allowPersonalizedFeed, setAllowPersonalizedFeed] = useState(feed);
	const [allowNotifications, setAllowNotifications] = useState(notifications);
	const [allowDarkMode, setAllowDarkMode] = useState(darkMode);

	useEffect(() => {
		setAllowPersonalizedFeed(feed);
		setAllowNotifications(notifications);
		setAllowDarkMode(darkMode);
	}, [notifications, feed, darkMode]);

	return (
		<Grid container justify='center' direction='column'>
			<Grid container>
				<Grid item style={{ flex: 1 }}>
					<Typography variant='overline' color='primary'>
						Personalized feed
					</Typography>
				</Grid>
				<Grid item>
					<Switch
						color='primary'
						checked={allowPersonalizedFeed}
						onChange={event => {
							setAllowPersonalizedFeed(event.target.checked);
							switchAllowPersonalizedFeed(userId);
						}}
					/>
				</Grid>
			</Grid>
			<Grid container>
				<Grid item style={{ flex: 1 }}>
					<Typography variant='overline' color='primary'>
						Allow notifications
					</Typography>
				</Grid>
				<Grid item>
					<Switch
						color='primary'
						checked={allowNotifications}
						onChange={event => {
							setAllowNotifications(event.target.checked);
							switchAllowNotification(userId);
						}}
					/>
				</Grid>
			</Grid>
			<Grid container>
				<Grid item style={{ flex: 1 }}>
					<Typography variant='overline' color='primary'>
						Dark mode
					</Typography>
				</Grid>
				<Grid item>
					<Switch
						color='primary'
						checked={allowDarkMode}
						onChange={event => {
							setAllowDarkMode(event.target.checked);
							switchAllowDarkMode(userId);
						}}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
};

const mapStateToProps = state => ({
	userId: state.auth.user.id,
	notifications: state.auth.user.allow_notifications,
	feed: state.auth.user.allow_personalized_feed,
	darkMode: state.auth.user.allow_dark_mode
});

export default connect(
	mapStateToProps,
	{ switchAllowDarkMode, switchAllowNotification, switchAllowPersonalizedFeed }
)(UserSettings);
