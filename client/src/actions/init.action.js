import { INIT_DONE, SIGN_OUT } from './types';

export const initDone = () => {
    return dispatch => {
        // To listen to change in local storage for logout in all tabs
        window.addEventListener('storage', function(e){
            if(e.key === 'logout'){
                dispatch({ type: SIGN_OUT });
            }
        });
        dispatch({ type: INIT_DONE });
    }
}