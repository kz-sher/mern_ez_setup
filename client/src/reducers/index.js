import { combineReducers } from 'redux';
import initReducer from './init.reducer';
import authReducer from './auth.reducer';
import alertReducer from './alert.reducer';

export default combineReducers({
    init: initReducer,
    auth: authReducer,
    alert: alertReducer,
});