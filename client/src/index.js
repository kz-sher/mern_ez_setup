import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import store from './utils/store';
import { initUserState } from './actions/auth.action';

// Set initial user states for authorization purpose
store.dispatch(initUserState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
