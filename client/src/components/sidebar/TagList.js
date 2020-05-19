import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getTags } from '../../actions/tagActions';
import { Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import TagItem from './TagItem';
import axios from 'axios';

class TagList extends Component {
	state = {
		tags: [],
		isLoading: true,
	};

	componentDidMount() {
		if (this.props.user_tags && !localStorage.getItem('recommended_tags')) {
			axios
				.post('/api/recommender', { tags: this.props.user_tags })
				.then((res) => {
					if (res.data.error) {
						this.setState({ tags: [], isLoading: false });
					} else {
						let tags = [];

						res.data.map((tag) => tags.push(tag));
						this.setState({ tags, isLoading: false });
						localStorage.setItem('recommended_tags', JSON.stringify(tags));
					}
				})
				.catch((err) => console.log(err));
		} else {
			const tags = JSON.parse(localStorage.getItem('recommended_tags'));
			this.setState({ tags, isLoading: false });
		}
	}

	render() {
		const { tags, isLoading } = this.state;

		return (
			<Fragment>
				{isLoading ? (
					<Skeleton
						animation='wave'
						width='30%'
						style={{ marginBottom: '.5rem' }}
					/>
				) : (
					<Typography variant='subtitle1' gutterBottom>
						{tags && tags.length > 0 && tags[0] !== ''
							? 'Recommended tags'
							: null}
					</Typography>
				)}
				{isLoading ? (
					<Fragment>
						<Skeleton animation='wave' height={30} />
						<Skeleton animation='wave' height={30} />
					</Fragment>
				) : (
					<Grid
						container
						direction='column'
						style={{ paddingBottom: '1rem' }}
						justify='space-between'
					>
						{tags && tags !== undefined
							? tags.map((tag) => (
									<Grid item key={tag._id}>
										<TagItem tag={tag} />
									</Grid>
							  ))
							: null}
					</Grid>
				)}
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	if (state.auth.isAuthenticated) {
		return {
			user_tags: state.auth.user.followed_tags.map((tag) => tag.title),
		};
	} else {
		return {
			tags: state.tags,
		};
	}
};

export default connect(
	mapStateToProps,
	{ getTags }
)(TagList);
