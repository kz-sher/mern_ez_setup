import axios from 'axios';
import { setAuthHeader } from 'utils/auth.util.js';
import { REGISTRATION_SUCCESS, FORGOT_PWD_SUCCESS, RESET_PWD_SUCCESS } from 'utils/messages.js';
import { showStatusMsg, hideStatusMsg } from 'actions/alert.action';
import { pushHistory } from 'actions/global.action';

export const signUp = ({ userData, setErrors, setSubmitting, resetForm }) => {
    return dispatch => {
        dispatch(hideStatusMsg());
        axios.post('/api/auth/register', userData).then(
            () => {
                const {header, content } = REGISTRATION_SUCCESS;
                dispatch(showStatusMsg({ status: 'success', msg: { header, content } }));
                resetForm();
                setSubmitting(false);
            },
            ({ response: { data, status } }) => {
                if(status === 422){ // Set form error if exists
                    setErrors(data);
                }
                else{
                    const err = data? data: 'Internal Server Error';
                    dispatch(showStatusMsg({ status: 'error', msg: { header: err } }));
                }
                setSubmitting(false);
            }
        );
    }
}

export const login = ({ userData, setErrors, setSubmitting }) => {
    return dispatch => {
        dispatch(hideStatusMsg());
        axios.post('/api/auth/login', userData).then(
            ({ data }) => {
                const { accessToken } = data;
                setAuthHeader(accessToken);
                dispatch(pushHistory('/dashboard'));
            },
            ({ response: { data, status } }) => {
                if(status === 422){ // Set form error if exists
                    setErrors(data);
                }
                else{
                    const err = data? data: 'Internal Server Error';
                    dispatch(showStatusMsg({ status: 'error', msg: { header: err } }));
                }
                setSubmitting(false);
            }
        );
    }
}

export const forgotPwd = ({ userData, setErrors, setSubmitting, resetForm }) => {
    return dispatch => {
        dispatch(hideStatusMsg());
        axios.post('/api/auth/forgotpwd', userData).then(
            () => {
                const { header, content } = FORGOT_PWD_SUCCESS;
                dispatch(showStatusMsg({ status: 'success', msg: { header, content } }));
                resetForm();
                setSubmitting(false);
            },
            ({ response: { data, status } }) => {
                if(status === 422){ // Set form error if exists
                    setErrors(data);
                }
                else{
                    const err = data? data: 'Internal Server Error';
                    dispatch(showStatusMsg({ status: 'error', msg: { header: err } }));
                }
                setSubmitting(false);
            }
        );
    }
}

export const resetPwd = ({ userData, params, setErrors, setSubmitting }) => {
    return (dispatch) => {
        
        const { uid, token } = params;

        dispatch(hideStatusMsg());
        axios.post(`/api/auth/resetPwd/${uid}/${token}`, userData).then(
            () => {
                const { header, content } = RESET_PWD_SUCCESS;
                dispatch(pushHistory('/login'));
                dispatch(showStatusMsg({ status: 'success', msg: { header, content } }));
            },
            ({ response: { data, status } }) => {
                if(status === 422){ // Set form error if exists
                    setErrors(data);
                }
                else{
                    const err = data? data: 'Internal Server Error';
                    dispatch(pushHistory('/login'));
                    dispatch(showStatusMsg({ status: 'error', msg: { header: err } }));
                }
                setSubmitting(false);
            }
        );
    }
}