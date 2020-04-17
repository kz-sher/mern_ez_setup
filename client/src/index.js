import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import 'semantic-ui-css/semantic.min.css';

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import { initUserState } from './actions/auth.action';
import store from './config/store';

// Create persistent store
const persistor = persistStore(store, null, () => {
  // Set initial user states for authorization purpose
  store.dispatch(initUserState());
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
