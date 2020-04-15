import { INIT_DONE } from './types';

export const initDone = () => {
    return dispatch => {
        dispatch({
            type: INIT_DONE,
        });
    }
}