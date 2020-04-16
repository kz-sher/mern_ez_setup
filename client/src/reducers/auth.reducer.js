import { SIGN_IN, SIGN_OUT } from 'actions/types';

const DEFAULT_STATE = {
    isAuthenticated: false,
    token: '',
    redirect: '/login', 
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {...state, isAuthenticated: true, token: action.token};
        case SIGN_OUT:
            return {...DEFAULT_STATE, redirect: '/'};
        default:
            return state;
    }
}