import React, { Component } from 'react';

class Profile extends Component {
	render() {
		console.log(this.props);
		return (
			<div>
				<p>{this.props.match.params._id}</p>
			</div>
		);
	}
}

export default Profile;
