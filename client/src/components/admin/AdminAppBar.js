import React from 'react';
import clsx from 'clsx';
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	makeStyles,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
}));

const AdminAppBar = ({ open, handleDrawerOpen }) => {
	const classes = useStyles();

	return (
		<AppBar
			position='fixed'
			className={clsx(classes.appBar, {
				[classes.appBarShift]: open,
			})}
		>
			<Toolbar>
				<IconButton
					color='inherit'
					aria-label='open drawer'
					onClick={handleDrawerOpen}
					edge='start'
					className={clsx(classes.menuButton, {
						[classes.hide]: open,
					})}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant='h6' noWrap>
					Admin Panel
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default AdminAppBar;
