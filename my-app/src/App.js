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
	  }
   });

const styles = theme => ({
	root: {
	  flexGrow: 1
	}
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
