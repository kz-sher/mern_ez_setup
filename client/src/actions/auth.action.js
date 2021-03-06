import history from 'config/history';
import authaxios from 'routes/authaxios';
import EventEmitter from 'utils/EventEmitter';
import { setAuthHeader } from 'utils/auth.util';
import { translateErrorToMsg } from 'utils/general.util'
import { closeLoginPopup } from './view.action';
import { SIGN_IN, SIGN_OUT } from './types';

export const signUp = ({ userData, setErrors, setSubmitting, resetForm }) => {
    return dispatch => {
        authaxios.register(userData).then(
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

export const login = ({ userData, fromPopup, setErrors, setSubmitting }) => {
    return dispatch => {
        authaxios.login(userData).then(
            ({ data: { accessToken } }) => {
                setAuthHeader(accessToken);
                dispatch(signIn(accessToken));
                // Check if login from popup
                if(fromPopup){
                    dispatch(closeLoginPopup());
                    setSubmitting(false);
                }
                else{
                    history.push('/dashboard');
                }
                
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
        authaxios.forgotPwd(userData).then(
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
        authaxios.resetPwd(params, userData).then(
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

export const confirmEmail = (params) => {
    return dispatch => {
        authaxios.confirmEmail(params).then(
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


export const signIn = token => {
    return dispatch => {
        dispatch({ type: SIGN_IN, token })
    }
}

export const signOut = () => {
    return dispatch => {
        authaxios.logout().then(() => {
            history.push('/');
            dispatch({ type: SIGN_OUT });
            dispatch(closeLoginPopup());
        })
    }
}

export const testSilentRefresh = () => {
    return dispatch => {
        authaxios.getSecret().then(() => {
            console.log('secret');
        }).catch(err=>err);
    }
}