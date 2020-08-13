import { combineReducers } from 'redux';
import user from './user'
import storage from './storage'

export default combineReducers({
    user,
    storage,
});
