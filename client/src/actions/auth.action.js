import axios from 'axios';
import { setAuthHeader } from 'utils/auth.util.js';
import { translateErrorToMsg } from 'utils/general.util.js'
import EventEmitter from 'utils/EventEmitter';
import history from 'utils/history';
import { initDone } from './init.action';
import { SIGN_IN, SIGN_OUT } from './types';

export const signUp = ({ userData, setErrors, setSubmitting, resetForm }) => {
    return dispatch => {
        axios.post('/api/auth/register', userData).then(
            ({ data: { msg } }) => {
                EventEmitter.emit('SIGNUP', { status: 'success', msg });
                resetForm();
                setSubmitting(false);
            },
            ({ response: { data, status } }) => {
                if(status === 422){ // Set form error if exists
                    setErrors(data);
                }
                else{
                    const err = translateErrorToMsg(data);
                    EventEmitter.emit('SIGNUP', { status: 'error', msg: err });
                }
                setSubmitting(false);
            }
        );
    }
}

export const login = ({ userData, setErrors, setSubmitting }) => {
    return dispatch => {
        axios.post('/api/auth/login', userData).then(
            ({ data: { accessToken } }) => {
                setAuthHeader(accessToken);
                dispatch(signIn(accessToken));
                history.push('/dashboard');;
            },
            ({ response: { data, status } }) => {
                if(status === 422){ // Set form error if exists
                    setErrors(data);
                }
                else{
                    const err = translateErrorToMsg(data);
                    EventEmitter.emit('LOGIN', { status: 'error', msg: err });
                }
                setSubmitting(false);
            }
        );
    }
}

export const forgotPwd = ({ userData, setErrors, setSubmitting, resetForm }) => {
    return dispatch => {
        axios.post('/api/auth/forgotpwd', userData).then(
            ({ data: { msg } }) => {
                EventEmitter.emit('FORGOTPWD', { status: 'success', msg });
                resetForm();
                setSubmitting(false);
            },
            ({ response: { data, status } }) => {
                if(status === 422){ // Set form error if exists
                    setErrors(data);
                }
                else{
                    const err = translateErrorToMsg(data);
                    EventEmitter.emit('FORGOTPWD', { status: 'error', msg: err });
                }
                setSubmitting(false);
            }
        );
    }
}

export const resetPwd = ({ userData, params, setErrors, setSubmitting }) => {
    return dispatch => {
        
        const { uid, token } = params;

        axios.post(`/api/auth/resetPwd/${uid}/${token}`, userData).then(
            ({ data: { msg } }) => {
                history.push('/login');
                EventEmitter.emit('LOGIN', { status: 'success', msg });
            },
            ({ response: { data, status } }) => {
                if(status === 422){ // Set form error if exists
                    setErrors(data);
                    setSubmitting(false);
                }
                else{
                    const err = translateErrorToMsg(data);
                    history.push('/login');
                    EventEmitter.emit('LOGIN', { status: 'error', msg: err });
                }
            }
        );
    }
}

export const confirmEmail = (uid, token) => {
    return dispatch => {
        axios.post(`/api/auth/email_confirmation/${uid}/${token}`).then(
            ({ data: { msg } }) => {
                history.push('/login');
                EventEmitter.emit('LOGIN', { status: 'success', msg });
            },
            ({ response: { data } }) => {
                const err = translateErrorToMsg(data);
                history.push('/login');
                EventEmitter.emit('LOGIN', { status: 'error', msg: err });
            },
        );
    }
}

export const initUserState = () => {
    return dispatch => {
        return axios.post(`/api/auth/token`).then(
            ({ data: { accessToken } }) => {
                setAuthHeader(accessToken);
                dispatch(signIn(accessToken));
                dispatch(initDone());
            },
            () => { dispatch(initDone()) },
        );
    }
}

export const signIn = token => {
    return dispatch => {
        dispatch({ type: SIGN_IN, token })
    }
}

export const signOut = () => {
    return dispatch => {
        axios.post('/api/auth/logout').then(() => {
            dispatch({ type: SIGN_OUT });
            localStorage.setItem('logout', Date.now()); // trigger event for all other opened tabs
        })
    }
}