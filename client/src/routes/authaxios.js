import axios from './axios';

const config = { interceptEnabled: false };

export default {
    register(payload) {
        return axios.post('/auth/register', payload, config)
    },
    login(payload) {
        return axios.post('/auth/login', payload, config)
    },
    confirmEmail(params) {
        const { uid, token } = params;
        return axios.post(`/auth/email_confirmation/${uid}/${token}`, '', config)
    },
    logout() {
        return axios.post('/auth/logout', '', config)
    },
    forgotPwd(payload) {
        return axios.post('/auth/forgotpwd', payload, config)
    },
    resetPwd(params, payload) {
        const { uid, token } = params;
        return axios.post(`/auth/resetpwd/${uid}/${token}`, payload, config)
    },
    renewToken() {
        return axios.post('/auth/token', '', config)
    },
    getSecret() {
        return axios.get('/auth/secret');
    }
}