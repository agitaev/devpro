import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { getPosts } from '../../actions/postActions';
import { Container } from '@material-ui/core';
import PostList from './PostList';

class Dashboard extends Component {
	state = {
		posts: []
	};

	componentDidMount() {
		this.props.getPosts();
		const posts = JSON.parse(localStorage.getItem('posts'));
		// console.log(posts);
		if (posts) {
			this.setState({ posts });
		}
	}

	render() {
		// const { user } = this.props.auth;

		return (
			<Container maxWidth='lg'>
				<PostList posts={this.state.posts} />

				{/*<div style={{ height: '75vh' }} className='container valign-wrapper'>
				<div className='row'>
					<div className='col s12 center-align'>
						<h4>
							<b>Hey there,</b> {user.name.split(' ')[0]}
							<p className='flow-text grey-text text-darken-1'>
								You are logged into a full-stack{' '}
								<span style={{ fontFamily: 'monospace' }}>MERN</span> app 👏
							</p>
						</h4>
						<button
							style={{
								width: '150px',
								borderRadius: '3px',
								letterSpacing: '1.5px',
								marginTop: '1rem'
							}}
							onClick={this.onLogoutClick}
							className='btn btn-large waves-effect waves-light hoverable blue accent-3'
						>
							Logout
						</button>
					</div>
				</div>
						</div>*/}
			</Container>
		);
	}
}

Dashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	getPosts: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	posts: state.posts
});

export default connect(
	mapStateToProps,
	{ logoutUser, getPosts }
)(Dashboard);
