import axios from 'axios';
import store from 'config/store';
import { setAuthHeader } from 'utils/auth.util';
import { signIn } from 'actions/auth.action';
import { openLoginPopup } from 'actions/view.action';

const isInterceptEnabled = (config={}) => {
    return config.hasOwnProperty('interceptEnabled') && !config.interceptEnabled ? false : true
}

axios.defaults.baseURL = '/api/v1';

axios.interceptors.request.use(
    req => {
        if (isInterceptEnabled(req)) {
            const token = store.getState().auth.token;
            if(token){
                req.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return req
    },
    error => { Promise.reject(error) }
);

axios.interceptors.response.use(
    res => res,
    error => {
        const { config, response: { status } } = error;
        const req = config; // original request
        
        // check if handler is needed
        if(isInterceptEnabled(config)){
            // if error is 401 and not retried yet
            if (status === 401 && !req._retry) {
                // set true to prevent retry 2nd time
                req._retry = true
                // attempt to refresh token
                return axios.post('/auth/token', '', { interceptEnabled: false }).then(
                        ({ data: { accessToken }}) => {
                            setAuthHeader(accessToken);
                            store.dispatch(signIn());
                            // retry the initially failed request
                            return axios(req)
                        },
                        () => {
                            // if user is previously authenticated
                            const isUserAuthenticated = store.getState().auth.isAuthenticated;
                            if(isUserAuthenticated){
                                // prompt user to login by showing popup
                                store.dispatch(openLoginPopup());
                            }
                            return Promise.reject(error);
                        })
            }
        }
        return Promise.reject(error);
    }
);

export default axios;