// Core
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Middlewares
import { middlewares } from './middleware';

// Instruments
import { uiReducer as ui } from '../bus/ui/reducer';

export const rootReducer = combineReducers({
  ui,
});

export const store = createStore(
  persistReducer({ key: process.env.REACT_APP_NAME || 'root', storage }, rootReducer),
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export const persistor = persistStore(store);
