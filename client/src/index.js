import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import App from './App';
import * as serviceWorker from './serviceWorker';

const app = (
	<Fragment>
		<CssBaseline />
		<App />
	</Fragment>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.register();
