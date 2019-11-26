import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'; 
import allReducers from './reduxx/reducers/index'
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';


const devTools =  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(allReducers, devTools);

ReactDOM.render(
				<Provider store={ store }>
					<App />
				</Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
