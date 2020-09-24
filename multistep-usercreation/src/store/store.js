import {combineReducers, createStore} from 'redux';
import stepReducer from './registration/reducer';
import step from './steps/reducer';

const rootReducer = combineReducers({
    step,
    user: stepReducer
});

const store = createStore(rootReducer);

export default store;