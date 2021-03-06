import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import {
	AccountCircleOutlined as ProfileIcon,
	ViewAgendaOutlined as FeedIcon,
	ExploreOutlined as ExploreIcon,
	ExpandLessOutlined as UpvoteIcon,
	StarBorderOutlined as SaveIcon,
	ChevronLeftOutlined as BackIcon,
	SearchOutlined as SearchIcon,
} from '@material-ui/icons';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { votePost, savePost } from '../../actions/postActions';

const useStyles = makeStyles((theme) => ({
	root: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		width: '100%',
		position: 'fixed',
		bottom: 0,
		zIndex: 1100,
	},
	icon: {
		'& span': {
			color: theme.palette.primary.contrastText,
		},
	},
}));

const BottomNavbar = (props) => {
	const classes = useStyles();
	const [value, setValue] = React.useState('');
	const isPostPage =
		window.location.pathname.split('/')[1] === 'posts' &&
		/[0-9a-fA-F]{24}/.test(window.location.pathname);
	const postId = isPostPage ? window.location.pathname.split('/')[2] : null;

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Fragment>
			{isPostPage ? (
				<BottomNavigation
					showLabels
					value={value}
					onChange={handleChange}
					className={classes.root}
				>
					<BottomNavigationAction
						className={classes.icon}
						label='Back To Home'
						value='back'
						component={RouterLink}
						to='/'
						icon={<BackIcon />}
					/>
					<BottomNavigationAction
						className={classes.icon}
						label='Save Post'
						value='save'
						onClick={() => props.savePost(postId, props.userId)}
						icon={<SaveIcon />}
					/>
					<BottomNavigationAction
						className={classes.icon}
						label='Updoot'
						value='upvote'
						onClick={() => props.votePost(postId, props.userId)}
						icon={<UpvoteIcon />}
					/>
				</BottomNavigation>
			) : (
				<BottomNavigation
					showLabels
					value={value}
					onChange={handleChange}
					className={classes.root}
				>
					<BottomNavigationAction
						className={classes.icon}
						label='Feed'
						value='feed'
						component={RouterLink}
						to='/'
						icon={<FeedIcon />}
					/>
					<BottomNavigationAction
						className={classes.icon}
						label='Explore'
						value='explore'
						component={RouterLink}
						to='/trending'
						icon={<ExploreIcon />}
					/>
					{
						<BottomNavigationAction
							className={classes.icon}
							label='Search'
							value='search'
							component={RouterLink}
							to='/search'
							icon={<SearchIcon />}
						/>
					}
					<BottomNavigationAction
						className={classes.icon}
						label='Profile'
						value='profile'
						component={RouterLink}
						to='/me'
						icon={<ProfileIcon />}
					/>
				</BottomNavigation>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	userId: state.auth.user.id,
});

export default connect(
	mapStateToProps,
	{ votePost, savePost }
)(withRouter(BottomNavbar));
