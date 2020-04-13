import { PUSH_HISTORY } from '../actions/types';

const DEFAULT_STATE = {
    history: '',
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case PUSH_HISTORY:
            state.history.push(action.history);
            return state;
        default:
            return state;
    }
}