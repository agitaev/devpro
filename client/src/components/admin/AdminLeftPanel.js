import React, { Fragment } from 'react';
import AdminDrawer from './AdminDrawer';
import AdminAppBar from './AdminAppBar';

const AdminLeftPanel = (props) => {
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Fragment>
			<AdminAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
			<AdminDrawer open={open} handleDrawerClose={handleDrawerClose} />
		</Fragment>
	);
};

export default AdminLeftPanel;
