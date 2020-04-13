import { PUSH_HISTORY } from './types';

export const pushHistory = history => {
    return dispatch => {
            dispatch({
                type: PUSH_HISTORY,
                history
            })
        }
}