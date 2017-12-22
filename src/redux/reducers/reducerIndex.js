import { combineReducers } from 'redux';
import authReducer from './authReducer';
import familyReducer from './familyReducer';
import userReducer from './userReducer';
import choreReducer from './choreReducer';
import storeReducer from './storeReducer';

// These will all be properties on state
export default combineReducers({
    auth: authReducer,
    family: familyReducer,
    user: userReducer,
    chores: choreReducer,
    storeItems: storeReducer
})