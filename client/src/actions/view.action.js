import { 
    OPEN_SIDEBAR, 
    CLOSE_SIDEBAR,
    OPEN_LOGINPOPUP, 
    CLOSE_LOGINPOPUP, 
} from 'actions/types';

export const openSidebar = () => {
    return dispatch => {
            dispatch({
                type: OPEN_SIDEBAR,
            })
        }
}

export const closeSidebar = () => {
    return dispatch => {
            dispatch({
                type: CLOSE_SIDEBAR
            })
        }
}

export const openLoginPopup = () => {
    return dispatch => {
            dispatch({
                type: OPEN_LOGINPOPUP,
            })
        }
}

export const closeLoginPopup = () => {
    return dispatch => {
            dispatch({
                type: CLOSE_LOGINPOPUP
            })
        }
}