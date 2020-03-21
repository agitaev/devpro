import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Chip } from '@material-ui/core';

const TagChip = ({ tag, small }) => {
	return (
		<Grid item>
			<Chip
				size={small && 'small'}
				clickable
				label={tag.title}
				component={RouterLink}
				to={`/tags/${tag.title}`}
				underline='none'
			/>
		</Grid>
	);
};

export default TagChip;
