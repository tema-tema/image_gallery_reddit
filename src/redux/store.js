import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

import { reducer as filterReducer, filterActions } from 'redux-filter';


const loggerMiddleware = createLogger();

const configureStore = preloadedState =>
createStore(
  rootReducer,
  preloadedState,
  composeWithDevTools(applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
  ),
);

//store.dispatch(filterActions.init());

export default configureStore;
