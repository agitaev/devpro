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
		h2: {
			fontWeight: 500
		},
		h4: {
			fontSize: '2rem'
		},
		h5: {
			fontWeight: 400,
			letterSpacing: '0.28px'
		},
		subtitle1: {
			fontWeight: 500,
			opacity: 0.8
		},
		subtitle2: {
			fontSize: '0.85rem',
			fontWeight: 400,
			opacity: 0.6
		},
		overline: {
			fontFamily: 'Roboto Mono',
			fontWeight: 400,
			fontSize: '1rem',
			textTransform: 'unset'
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
			default: '#fafafa'
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
serviceWorker.unregister();
