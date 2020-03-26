import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ArrowBackIosOutlined as BackIcon } from '@material-ui/icons';

const BackToHomeButton = props => {
	return (
		<Button color='inherit' startIcon={<BackIcon />} component={Link} to='/'>
			Back to home
		</Button>
	);
};

export default BackToHomeButton;
