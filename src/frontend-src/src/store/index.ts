import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import projectsReducer from './projects';
import projectReducer from './project';
import contributionsReducer from './contributions';

const rootReducer = combineReducers({
  session: sessionReducer,
  projects: projectsReducer,
  project: projectReducer,
  contributions: contributionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

let enhancer:any;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
   // @ts-ignore: don't know how to add this to window... investigate later.
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState?:any) => { 
    return createStore(rootReducer, preloadedState, enhancer);
};
  
export default configureStore;