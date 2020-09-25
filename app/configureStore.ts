import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createMemoryHistory} from 'history';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import { devicesReducer } from './modules/connection/devices.reducer';
import connectionReducer from './modules/connection/connection.reducer';

export const routerHistory = createMemoryHistory();

const initialState = {router: routerHistory};

const reducers = combineReducers({
  router: connectRouter(routerHistory),
  devices: devicesReducer,
  connection: connectionReducer,
});

const middlewares = applyMiddleware(thunk, routerMiddleware(routerHistory));

const store = createStore(reducers, initialState, middlewares);
export default store;
