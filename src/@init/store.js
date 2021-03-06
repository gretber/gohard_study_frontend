// Core
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Middlewares
import { middlewares } from './middleware';

// Instruments
import { uiReducer as ui } from '../bus/ui/reducer';
import { togglersReducer as togglers } from '../bus/togglers';
import { todosReducer as todos } from '../bus/todos/reducer';

export const rootReducer = combineReducers({
  ui,
  togglers,
  todos,
});

export const store = createStore(
  persistReducer({ key: 'root', storage }, rootReducer),
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export const persistor = persistStore(store);
