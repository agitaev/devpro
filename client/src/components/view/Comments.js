import React from 'react';
import {
	Grid,
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const Comments = ({ post }) => {
	return (
		<Grid container justify='center' style={{ paddingTop: '2rem' }}>
			<CommentForm post={post} />
			<ExpansionPanel
				style={{ minWidth: '100%', background: 'inherit', position: 'inherit' }}
			>
				<ExpansionPanelSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='comments-panel-content'
					id='comments-panel-header'
				>
					<Typography color='textSecondary'>
						View comments ({post && post.comments.length})
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<CommentList comments={post && post.comments} />
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</Grid>
	);
};

export default Comments;
