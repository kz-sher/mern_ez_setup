import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from 'reducers';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import CrossBrowserListener from 'utils/CrossBrowserListener';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet
}

const persistedReducer = persistReducer(persistConfig, reducers)
const store = createStore(persistedReducer, {}, composeWithDevTools(applyMiddleware(reduxThunk)));

window.addEventListener('storage', CrossBrowserListener(store, persistConfig));

export default store;
