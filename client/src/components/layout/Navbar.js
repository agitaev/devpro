import React from 'react';
import {
	Link as RouterLink,
	useRouteMatch,
	withRouter
} from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';
import {
	AppBar,
	Toolbar,
	Typography,
	Grid,
	Button,
	InputBase,
	Container,
	IconButton
} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Casino as CasinoIcon, Search as SearchIcon } from '@material-ui/icons';
import { connect } from 'react-redux';
import { BorderColorOutlined as CreatePostIcon } from '@material-ui/icons/';
import { setSearchText } from '../../actions/postActions';

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

const Navbar = ({ auth, setSearchText, logoutUser, searchText }) => {
	const classes = useStyles();
	const match = useRouteMatch();

	return (
		<AppBar position='sticky'>
			<Container maxWidth='lg'>
				<Toolbar variant='dense'>
					<Grid container alignItems='center'>
						<CasinoIcon />
						<Typography
							variant='h6'
							component={RouterLink}
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
								<Button color='inherit' component={RouterLink} to='/posts/new'>
									Create Post
								</Button>
								<Button color='inherit' component={RouterLink} to='/me'>
									Profile
								</Button>
							</React.Fragment>
						) : (
							<React.Fragment>
								<Button color='inherit' component={RouterLink} to='/login'>
									Sign In
								</Button>
								<Button color='inherit' component={RouterLink} to='/register'>
									Sign Up
								</Button>
							</React.Fragment>
						)}
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder='Search'
								value={searchText}
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput
								}}
								inputProps={{ 'aria-label': 'search' }}
								onChange={e => setSearchText(e.target.value)}
							/>
						</div>
					</Grid>
					<Grid container justify='flex-end' className={classes.sectionMobile}>
						<IconButton
							component={RouterLink}
							to='/posts/new'
							aria-label='create new post'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							color='inherit'
						>
							<CreatePostIcon />
						</IconButton>
					</Grid>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

const mapStateToProps = state => ({
	auth: state.auth,
	searchText: state.posts.searchText
});

export default connect(
	mapStateToProps,
	{ setSearchText }
)(withRouter(Navbar));
