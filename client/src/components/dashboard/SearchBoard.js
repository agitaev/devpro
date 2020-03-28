import React from 'react';
import { Container, Hidden } from '@material-ui/core';

const SearchBoard = props => {
	return (
		<Container style={{ margin: '2rem auto 5rem' }}>
			<Hidden mdUp>search</Hidden>
		</Container>
	);
};

export default SearchBoard;
