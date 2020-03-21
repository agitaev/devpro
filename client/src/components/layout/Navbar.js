import React from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';
import {
	AppBar,
	Toolbar,
	Typography,
	Grid,
	Button,
	InputBase
} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Casino as CasinoIcon, Search as SearchIcon } from '@material-ui/icons';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
	grow: {
		flexGrow: 1
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginLeft: 0,
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1)
		}
	},
	searchIcon: {
		paddingLeft: '.5rem',
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputRoot: {
		color: 'inherit',
		width: '100%'
	},
	inputInput: {
		padding: '.5rem .5rem .5rem 2.4rem',
		width: '100%'
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex'
		}
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none'
		}
	},
	logoMobile: {
		justifyContent: 'center',
		[theme.breakpoints.up('md')]: {
			justifyContent: 'flex-start'
		}
	}
}));

const Navbar = ({ logoutUser, auth }) => {
	const classes = useStyles();

	return (
		<AppBar position='sticky'>
			<Toolbar variant='dense'>
				<Grid container alignItems='center' className={classes.logoMobile}>
					<CasinoIcon />
					<Typography
						variant='h6'
						component={Link}
						to='/'
						style={{
							marginLeft: '.25rem',
							color: '#fff',
							textDecoration: 'none',
							textTransform: 'uppercase'
						}}
					>
						devpro
					</Typography>
				</Grid>
				<Grid container justify='flex-end' className={classes.sectionDesktop}>
					{auth.isAuthenticated ? (
						<React.Fragment>
							<Button color='inherit' component={Link} to='/posts/new'>
								I have an idea
							</Button>
							<Button color='inherit' onClick={() => logoutUser()}>
								Sign Out
							</Button>
						</React.Fragment>
					) : (
						<Button color='inherit' component={Link} to='/register'>
							Sign In/Up
						</Button>
					)}
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder='Search'
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ logoutUser }
)(Navbar);
