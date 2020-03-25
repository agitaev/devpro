import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import {
	AccountCircleOutlined as ProfileIcon,
	ViewAgendaOutlined as FeedIcon,
	ExploreOutlined as ExploreIcon
} from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	root: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		width: '100%',
		position: 'fixed',
		bottom: 0,
		zIndex: 1100
	},
	menuIcon: {
		'& span': {
			color: theme.palette.primary.contrastText
		}
	}
}));

export default function BottomNavbar() {
	const classes = useStyles();
	const [value, setValue] = React.useState('recents');

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<BottomNavigation
			value={value}
			onChange={handleChange}
			className={classes.root}
		>
			<BottomNavigationAction
				className={classes.menuIcon}
				label='Feed'
				value='feed'
				component={RouterLink}
				to='/'
				icon={<FeedIcon />}
			/>
			<BottomNavigationAction
				className={classes.menuIcon}
				label='Explore'
				value='explore'
				component={RouterLink}
				to='/trending'
				icon={<ExploreIcon />}
			/>
			<BottomNavigationAction
				className={classes.menuIcon}
				label='Profile'
				value='profile'
				component={RouterLink}
				to='/me'
				icon={<ProfileIcon />}
			/>
		</BottomNavigation>
	);
}
