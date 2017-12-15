import { combineReducers } from 'redux';
import authReducer from './authReducer';
import familyReducer from './familyReducer';

// These will all be properties on state
export default combineReducers({
    auth: authReducer,
    family: familyReducer
})