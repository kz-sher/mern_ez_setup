import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import alertReducer from './alert.reducer';
import globalReducer from './global.reducer';

export default combineReducers({
    auth: authReducer,
    alert: alertReducer,
    global: globalReducer,
});