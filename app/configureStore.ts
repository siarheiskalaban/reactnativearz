import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createMemoryHistory} from 'history';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import { devicesReducer } from './modules/connection/devices.reducer';

export const routerHistory = createMemoryHistory();

const initialState = {router: routerHistory};

const reducers = combineReducers({
  router: connectRouter(routerHistory),
  devices: devicesReducer,
});

const middlewares = applyMiddleware(thunk, routerMiddleware(routerHistory));

const store = createStore(reducers, initialState, middlewares);
export default store;
