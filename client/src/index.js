import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './App';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
	typography: {
		fontFamily: [
			'Google Sans Display',
			'Roboto',
			'"Helvetica Neue"',
			'sans-serif',
			'Arial',
			'-apple-system'
		].join(','),
		h5: {
			fontWeight: 400,
			letterSpacing: '0.28px'
		},
		h2: {
			fontWeight: 500
		},
		subtitle1: {
			fontWeight: 500,
			opacity: 0.8
		}
	},
	palette: {
		primary: {
			main: '#1e2025',
			contrastText: '#ffffff'
		},
		secondary: {
			main: '#09d3ac',
			contrastText: '#ffffff'
		},
		background: {
			default: '#fff'
		},
		text: {
			primary: '#424242'
		}
	}
});

const app = (
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<App />
	</ThemeProvider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
