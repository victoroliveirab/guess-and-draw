import {combineReducers} from 'redux';
import AuthReducer from '../pages/Auth/redux/reducer';
import SessionReducer from '../pages/Session/redux/reducer';

const reducers = combineReducers({
    AuthReducer,
    SessionReducer,
});

export default reducers;