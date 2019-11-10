import registerReducer from './register';
import loginReducer from './login';
import { combineReducers } from 'redux'; 

const allReducers = combineReducers({
    register:   registerReducer,
    login:      loginReducer,
});

export default allReducers;