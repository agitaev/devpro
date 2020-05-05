import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AdminLeftPanel from './AdminLeftPanel';
import { Switch, Route, withRouter } from 'react-router-dom';
import AdminPosts from './AdminPosts';
import AdminComments from './AdminComments';
import { logoutUser } from '../../actions/authActions';
import AdminOverview from './AdminOverview';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

const AdminPanel = ({ isAdmin, match, history, logoutUser }) => {
	const classes = useStyles();

	useEffect(() => {
		if (!isAdmin) {
			logoutUser();
			history.push('/login');
		}
	}, [isAdmin, logoutUser, history]);

	return (
		<div className={classes.root}>
			<AdminLeftPanel />
			<main className={classes.content}>
				<Switch>
					<Route
						exact
						path={`${match.path}/`}
						render={(routeProps) => <AdminOverview />}
					/>
					<Route
						exact
						path={`${match.path}/posts`}
						render={(routeProps) => <AdminPosts />}
					/>
					<Route
						exact
						path={`${match.path}/comments`}
						render={(routeProps) => <AdminComments />}
					/>
				</Switch>
			</main>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isAdmin: state.auth.user.username === 'admin',
});

export default connect(
	mapStateToProps,
	{ logoutUser }
)(withRouter(AdminPanel));
