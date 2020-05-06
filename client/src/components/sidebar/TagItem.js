import React, { Component } from 'react';
import { Paper, Grid, Button } from '@material-ui/core';
import TagChip from '../chunks/TagChip';
import { connect } from 'react-redux';
import { followTag } from '../../actions/tagActions';

class TagItem extends Component {
	state = {
		tag: {},
		elevation: 0,
	};

	onMouseOver = () => this.setState({ elevation: 5 });
	onMouseOut = () => this.setState({ elevation: 0 });

	onFollowTag = () => {
		followTag(this.state.tag._id, this.props.user.id);
	};

	componentDidMount() {
		if (this.props.tag) {
			this.setState({ tag: this.props.tag });
		}
	}

	render() {
		const { tag } = this.props;
		return (
			<Paper
				elevation={this.state.elevation}
				onMouseOver={this.onMouseOver}
				onMouseOut={this.onMouseOut}
				style={{ background: 'inherit', padding: '.5rem' }}
			>
				<Grid container justify='space-between' alignItems='center'>
					<Grid item>
						<TagChip tag={tag} color='primary' />
					</Grid>
					<Grid item>
						<Button size='small' onClick={this.onFollowTag}>
							follow
						</Button>
					</Grid>
				</Grid>
			</Paper>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.auth.user,
});

export default connect(mapStateToProps)(TagItem);
