import React, { Fragment } from 'react';
import clsx from 'clsx';
import {
	Drawer,
	IconButton,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
	useTheme,
} from '@material-ui/core';
import {
	ChevronLeft as ChevronLeftIcon,
	ChevronRight as ChevronRightIcon,
	CommentOutlined as CommentsIcon,
	DynamicFeedOutlined as PostsIcon,
	ExitToAppOutlined as ExitIcon,
	HomeOutlined as HomeIcon,
} from '@material-ui/icons';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
}));

const AdminDrawer = ({ open, match, handleDrawerClose, logoutUser }) => {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<Drawer
			variant='permanent'
			className={clsx(classes.drawer, {
				[classes.drawerOpen]: open,
				[classes.drawerClose]: !open,
			})}
			classes={{
				paper: clsx({
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				}),
			}}
		>
			<div className={classes.toolbar}>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'rtl' ? (
						<ChevronRightIcon />
					) : (
						<ChevronLeftIcon />
					)}
				</IconButton>
			</div>
			<Fragment>
				<Divider />
				<List>
					<RouterLink
						to={`${match.url}/comments`}
						style={{ color: 'inherit', textDecoration: 'none' }}
					>
						<ListItem button alignItems='center'>
							<ListItemIcon>
								<CommentsIcon />
							</ListItemIcon>
							<ListItemText primary='Comments' />
						</ListItem>
					</RouterLink>
					<RouterLink
						to={`${match.url}/posts`}
						style={{ color: 'inherit', textDecoration: 'none' }}
					>
						<ListItem button>
							<ListItemIcon>
								<PostsIcon />
							</ListItemIcon>
							<ListItemText primary='Posts' />
						</ListItem>
					</RouterLink>
				</List>
				<Divider />
				<List>
					<ListItem button component={RouterLink} to='/'>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary='Back to Home' />
					</ListItem>
					<ListItem button onClick={logoutUser}>
						<ListItemIcon>
							<ExitIcon />
						</ListItemIcon>
						<ListItemText primary='Sign Out' />
					</ListItem>
				</List>
			</Fragment>
		</Drawer>
	);
};

export default compose(
	connect(
		null,
		{ logoutUser }
	)
)(withRouter(AdminDrawer));
