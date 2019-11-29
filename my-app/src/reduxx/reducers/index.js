import registerReducer from './register';
import loginReducer from './login';
import userReducer from './user';
import { combineReducers } from 'redux'; 

const allReducers = combineReducers({
    register:   	registerReducer,
	login:      	loginReducer,
	user:			userReducer,
});

export default allReducers;