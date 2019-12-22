import './App.css';
import React from 'react';
import Routes from './components/Routes';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';
import { withStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

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
		'margin-top': '100px',
		'box-shadow': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
	},
	paddingLeftRight: {
		paddingLeft: '32px',
		paddingRight: '32px',
	},
   });

const styles = theme => ({
	root: {
	  flexGrow: 1
	},
});

  
function App() {

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
