import thunk from 'redux-thunk';
import sessionReducer from './session';
import projectsReducer from './projects';
import projectReducer from './project';
import contributionsReducer from './contributions';
import { createStore, combineReducers, applyMiddleware, compose, StoreEnhancer } from 'redux';

const rootReducer = combineReducers({
  session: sessionReducer,
  projects: projectsReducer,
  project: projectReducer,
  contributions: contributionsReducer,
});


let enhancer: StoreEnhancer<unknown, {}> | undefined;

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

export type RootState = ReturnType<typeof rootReducer>;

  
export default configureStore;