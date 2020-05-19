import React, { Fragment, useEffect, lazy, Suspense } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';

const TrendingItem = lazy(() => import('./TrendingItem'));

const TrendingList = ({ posts, getPosts }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	const skeletons = [];
	import('underscore').then((_) => {
		_.times(4, (index) => {
			skeletons.push(
				<Fragment key={index}>
					<br />
					<Skeleton
						animation='wave'
						width='75%'
						height={30}
						style={{ marginLeft: '.5rem' }}
					/>
					<Skeleton
						animation='wave'
						width='35%'
						height={30}
						style={{ marginLeft: '.5rem', paddingBottom: '1rem' }}
					/>
					<br />
				</Fragment>
			);
		});
	});

	return (
		<Suspense fallback={skeletons}>
			{!(posts && posts.length > 0) ? (
				<Skeleton
					animation='wave'
					width='20%'
					style={{ marginBottom: '.5rem' }}
				/>
			) : (
				<Typography variant='subtitle1' gutterBottom>
					Trending posts
				</Typography>
			)}
			<Paper style={{ marginBottom: '1rem' }}>
				{!(posts && posts.length > 0) ? (
					<Fragment>{skeletons}</Fragment>
				) : (
					<Grid container justify='space-between'>
						{posts && posts.length > 0
							? posts.map((post, index) =>
									index < 5 ? (
										<Grid key={post._id} item xs={12}>
											<TrendingItem post={post} />
										</Grid>
									) : null
							  )
							: null}
					</Grid>
				)}
			</Paper>
		</Suspense>
	);
};

const mapStateToProps = (state) => ({
	posts: state.posts.list
		.filter((post) => post.approved)
		.sort((x, y) =>
			x.vote_count < y.vote_count ? 1 : x.vote_count > y.vote_count ? -1 : 0
		),
});

export default connect(
	mapStateToProps,
	{ getPosts }
)(TrendingList);
