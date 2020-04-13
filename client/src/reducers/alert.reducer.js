import { SHOW_STATUS_MSG, HIDE_STATUS_MSG } from 'actions/types';

const DEFAULT_STATE = {
    show: false,
    msg: {
        header: '',
        content: '',
    },
    status: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SHOW_STATUS_MSG:
            return {...state, show: true, msg: action.msg, status: action.status}
        case HIDE_STATUS_MSG:
            return DEFAULT_STATE;
        default:
            return state;
    }
}