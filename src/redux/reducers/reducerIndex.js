import { combineReducers } from 'redux';
import authReducer from './authReducer';
import employeeFromReducer from './employeeFormReducer';
import employeeReducer from './employeeReducer'

// These will all be properties on state
export default combineReducers({
    auth: authReducer,
    employeeForm: employeeFromReducer,
    employees: employeeReducer
})