import {combineReducers} from 'redux';
import UserReducer from './reducer-users';
import Stages from './reducer-stages';


// Import and then store all of your reducers here.
// This creates a global state.
const allReducers = combineReducers({
  stages: Stages,
});

export default allReducers;
