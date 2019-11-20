import registerReducer from './register';
import loginReducer from './login';
// import tokkenReducer from './tokken';
import { combineReducers } from 'redux'; 

const allReducers = combineReducers({
    register:   	registerReducer,
	login:      	loginReducer,
	// tokken:			tokkenReducer,
});

export default allReducers;