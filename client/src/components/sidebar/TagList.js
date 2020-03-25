import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTags } from '../../actions/tagActions';
import { Grid, Typography } from '@material-ui/core';
import TagItem from './TagItem';
import axios from 'axios';

class TagList extends Component {
	state = {
		tags: [],
		user_tags: []
	};

	componentDidMount() {
		// if (this.props.user_tags && !localStorage.getItem('recommended_tags')) {
		// 	// this.setState({ user_tags: this.props.user_tags });
		// 	axios
		// 		.post('/api/recommender', { tags: ['javascript'] })
		// 		.then(res =>
		// 			res.data.map(tag => {
		// 				console.log(tag);
		// 				let tags = this.state.tags.concat(tag);
		// 				this.setState({ tags });
		// 				return localStorage.setItem(
		// 					'recommended_tags',
		// 					JSON.stringify(tags)
		// 				);
		// 			})
		// 		)
		// 		.catch(err => console.log(err));
		// } else {
		// 	const tags = JSON.parse(localStorage.getItem('recommended_tags'));
		// 	this.setState({ tags });
		// }
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		// console.log(nextProps);
		if (nextProps.user_tags) {
			this.setState({ user_tags: nextProps.user_tags });
		}
	}

	render() {
		const { tags } = this.state;

		return (
			<React.Fragment>
				<Typography variant='subtitle1' gutterBottom>
					{tags && tags.length > 0 ? 'Recommended tags' : null}
				</Typography>
				<Grid
					container
					direction='column'
					style={{ paddingBottom: '1rem' }}
					justify='space-between'
				>
					{tags && tags !== undefined
						? tags.map(tag => (
								<Grid item key={tag._id}>
									<TagItem tag={tag} />
								</Grid>
						  ))
						: null}
				</Grid>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	if (state.auth.isAuthenticated) {
		return {
			user_tags: state.auth.user.followed_tags.map(tag => tag.title)
		};
	} else {
		return {
			tags: state.tags
		};
	}
};

export default connect(
	mapStateToProps,
	{ getTags }
)(TagList);
