import React from 'react';
import {
	Container,
	makeStyles,
	fade,
	InputBase,
	Paper,
	Hidden,
	Grid,
	Typography,
	Button
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { setSearchText, getPosts } from '../../actions/postActions';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import TagChip from '../chunks/TagChip';

const useStyles = makeStyles(theme => ({
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.black, 0.02),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.black, 0.035)
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		marginBottom: theme.spacing(2)
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputRoot: {
		color: 'inherit',
		width: '100%'
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		width: '100%',
		border: `1px solid ${fade(theme.palette.common.black, 0.15)}`,
		borderRadius: theme.shape.borderRadius
	}
}));

const SearchBar = ({ getPosts, posts }) => {
	const classes = useStyles();
	const [postList, setPostList] = useState(posts);
	const [searchText, setSearchText] = useState('');

	// check if posts are available in the store
	// if not, fetch it
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	// assign posts to local variable
	useEffect(() => {
		setPostList(posts);
	}, [posts]);

	return (
		<Container style={{ margin: '1rem auto 5rem' }}>
			<Hidden mdUp>
				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						autoFocus
						value={searchText}
						placeholder='Search'
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput
						}}
						inputProps={{ 'aria-label': 'search' }}
						onChange={e => setSearchText(e.target.value)}
					/>
				</div>
				{postList &&
					searchText !== '' &&
					postList
						.filter(post => post.title.includes(searchText))
						.map(post => (
							<Paper
								style={{ padding: '1rem', marginBottom: '.5rem' }}
								key={post._id}
							>
								<Grid container direction='row' spacing={2} alignItems='center'>
									<Grid item xs={10}>
										<Typography variant='subtitle1'>{post.title}</Typography>
										<Typography variant='subtitle2' noWrap>
											{post.subtitle}
										</Typography>
										<Grid container spacing={1} style={{ marginTop: '.5rem' }}>
											{post.tags &&
												post.tags.map(tag => (
													<TagChip key={tag._id} tag={tag} small />
												))}
										</Grid>
									</Grid>
									<Grid
										container
										item
										xs={2}
										justify='center'
										alignItems='center'
									>
										<Button
											size='large'
											variant='contained'
											color='primary'
											component={RouterLink}
											to={`/posts/${post._id}`}
										>
											view
										</Button>
									</Grid>
								</Grid>
							</Paper>
						))}
				{false && <Typography variant='overline'>No results found</Typography>}
			</Hidden>
		</Container>
	);
};

const mapStateToProps = state => ({
	auth: state.auth,
	posts: state.posts.list
});

export default connect(
	mapStateToProps,
	{ setSearchText, getPosts }
)(SearchBar);
