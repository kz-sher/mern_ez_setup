import authaxios from 'routes/authaxios';
import { setAuthHeader, isUserAuthenticated } from 'utils/auth.util';
import { signIn } from './auth.action';
import { INIT_DONE } from './types';

export const initUserState = () => {
    return dispatch => {
        if(!isUserAuthenticated()){
            authaxios.renewToken().then(
                ({ data: { accessToken } }) => {
                    setAuthHeader(accessToken);
                    dispatch(signIn(accessToken));
                    dispatch(initDone());
                },
                () => { dispatch(initDone()) },
            );
        }
    }
}

export const initDone = () => {
    return dispatch => {
        dispatch({ type: INIT_DONE });
    }
}