import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import { persistConfig } from './persist';
import reducers from 'reducers';
import CrossTabListener from 'utils/CrossTabListener';

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, {}, composeWithDevTools(applyMiddleware(reduxThunk)));

// Add listener for local storage change for state persistence across multi-tabs
window.addEventListener('storage', CrossTabListener(store, persistConfig));

export default store;
