import { INIT_DONE } from 'actions/types';

const DEFAULT_STATE = {
    isUserInitialized: false,
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case INIT_DONE:
            return {...state, isUserInitialized: true}
        default:
            return state;
    }
}