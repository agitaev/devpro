import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AdminLeftPanel from './AdminLeftPanel';
import { Switch, Route, withRouter } from 'react-router-dom';

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

const AdminPanel = ({ isAdmin, match }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AdminLeftPanel />
			<main className={classes.content}>
				<Switch>
					<Route
						exact
						path={`${match.path}/`}
						render={(routeProps) => <p>overview</p>}
					/>
					<Route
						exact
						path={`${match.path}/posts`}
						render={(routeProps) => <p>posts</p>}
					/>
					<Route
						exact
						path={`${match.path}/comments`}
						render={(routeProps) => <p>comments</p>}
					/>
				</Switch>
			</main>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isAdmin: state.auth.user.username === 'admin',
});

export default connect(mapStateToProps)(withRouter(AdminPanel));
