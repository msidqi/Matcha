import './App.css';
import React from 'react';
import Routes from './components/Routes';
import CssBaseline from '@material-ui/core/CssBaseline';
// import { withCookies } from 'react-cookie';

function App() {

  return (
    	<>
		<CssBaseline />
		<Routes />
    	</>
  );
}

export default App;
// export default withCookies(App);
