import axios from 'axios';
import store from 'config/store';

export const isUserAuthenticated = () => {
   return store.getState().auth.isAuthenticated;
}

export const setAuthHeader = token => {
   if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
   } else {
      delete axios.defaults.headers.common["Authorization"];
   }
};

