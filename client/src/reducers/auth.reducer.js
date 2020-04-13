import { SIGN_IN } from '../actions/types';

const DEFAULT_STATE = {
    isAuthenticated: false,
    token: '',
    username: ''
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {...state, isAuthenticated: true, token: action.token}
        default:
            return state;
    }
}