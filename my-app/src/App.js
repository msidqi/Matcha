import './App.css';
import Login from './Views/login';
import Register from './Views/register';
import Home from './Views/home';
import Users from './Views/users';
import Nav from './components/navbar';
import React, { /*useState*/ } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link  
} from 'react-router-dom';

function App() {
  // const [state, state2] = useState(['1', '2'], 'hhhhh');
  
  return (
    // <Register param1={state} param2={ state2 } />
    <Router>
      <Nav />
      
      <Switch>
        <Route path="/users" exact component={Users} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
