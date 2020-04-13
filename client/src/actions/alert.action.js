import { SHOW_STATUS_MSG, HIDE_STATUS_MSG } from './types';

export const showStatusMsg = payload => {
    return dispatch => {
            dispatch({
                type: SHOW_STATUS_MSG,
                ...payload
            })
        }
}

export const hideStatusMsg = () => {
    return dispatch => {
            dispatch({
                type: HIDE_STATUS_MSG
            })
        }
}