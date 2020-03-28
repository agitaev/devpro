import React from 'react';
import { CircularProgress, Button } from '@material-ui/core';

const SpinnerButton = props => {
	const { onClick, loading, text, color, size, style, type } = props;

	return (
		<Button
			type={type}
			style={style}
			variant='contained'
			onClick={onClick}
			disabled={loading}
			color={color ? color : 'primary'}
			size={size ? size : 'medium'}
		>
			{loading ? <CircularProgress color={color} size={26} /> : text}
		</Button>
	);
};

export default SpinnerButton;
