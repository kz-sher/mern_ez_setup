import { 
    OPEN_SIDEBAR, 
    CLOSE_SIDEBAR,
    OPEN_LOGINPOPUP, 
    CLOSE_LOGINPOPUP, 
} from 'actions/types';

const DEFAULT_STATE = {
    sidebarOpen: false,
    loginPopupOpen: false,
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case OPEN_SIDEBAR:
            return {...state, sidebarOpen: true}
        case CLOSE_SIDEBAR:
            return {...state, sidebarOpen: false};
        case OPEN_LOGINPOPUP:
            return {...state, loginPopupOpen: true}
        case CLOSE_LOGINPOPUP:
            return {...state, loginPopupOpen: false};
        default:
            return state;
    }
}