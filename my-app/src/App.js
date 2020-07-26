import './App.css';
import React, { useEffect } from 'react';
import Routes from './components/Routes';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';
import { withStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import socketIOClient from "socket.io-client";

const Theme = createMuiTheme({
	typography: {
		h6: {
			fontFamily: "typeface-roboto"
		  },
		},
	margincenter: {
		margin: '5px auto',
	},
	itemscenter: {
		'align-content': 'center',
	},
	banner: {
		background: '#ef4a25',
		height: '10px',
	},
	info: {
		textAlign:  'center',
		height: '400px',
	},
	card: {
		paddingRight:    '0px',
		paddingLeft:    '0px',
		background: 'white',
		'border-radius': '5px',
		overflow: 'auto',
		'margin': '100px auto',
		// 'margin-bottom': '100px',
		'box-shadow': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
	},
	heightAuto: {
		height: 'auto',
	},
	paddingLeftRight: {
		paddingLeft: '32px',
		paddingRight: '32px',
	},
	wordBreak: {
		'word-wrap': 'break-word'
	}
   });

const styles = theme => ({
	root: {
	  flexGrow: 1
	},
});


let socket;
function App() {
	useEffect(() => {
		socket = socketIOClient('/');
		socket.on('connect', function () { console.log('connect'); });
		socket.on('news', function (data) { console.log('news'); });
		socket.on('disconnect', function () { console.log('disconnect'); });
	}, [socket]);

	const sendEmit = () => {
		socket.emit('clie', { my: 'data' });
	}
  
	return (
    	<>
		<CssBaseline />
		<MuiThemeProvider theme={Theme}>
			<Routes />
		</MuiThemeProvider>
    	</>
  );
}

export default withStyles(styles)(App);
