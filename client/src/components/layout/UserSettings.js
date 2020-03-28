import React, { Fragment } from 'react';
import { Grid, Typography, Switch } from '@material-ui/core';

const UserSettings = props => {
	const userSettings = [
		{
			title: 'Personalized Feed',
			checked: false
		},
		{
			title: 'Dark Mode',
			checked: false
		},
		{
			title: 'Receive Notifications',
			checked: false
		}
	];

	return (
		<Grid container justify='center' direction='column'>
			{userSettings &&
				userSettings.map((setting, index) => (
					<Grid container key={index}>
						<Grid item style={{ flex: 1 }}>
							<Typography variant='overline' color='primary'>
								{setting.title}
							</Typography>
						</Grid>
						<Grid item>
							<Switch color='primary' checked={setting.checked} />
						</Grid>
					</Grid>
				))}
		</Grid>
	);
};

export default UserSettings;
