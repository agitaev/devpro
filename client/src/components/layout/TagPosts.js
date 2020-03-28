import React, { Component } from 'react';

class TagPosts extends Component {
	render() {
		return (
			<div>
				<p>{this.props.match.params.tag}</p>
			</div>
		);
	}
}

export default TagPosts;
