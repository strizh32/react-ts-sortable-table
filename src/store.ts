import { combineReducers, createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { TableReducer } from './features/table';

const rootReducer = combineReducers({
  table: TableReducer,
});

const store = createStore(
  rootReducer,
  /* preloadedState, */ devToolsEnhancer({})
);

export default store;
