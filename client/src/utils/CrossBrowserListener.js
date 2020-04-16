import { getStoredState, REHYDRATE } from 'redux-persist'

const CrossBrowserListener = (store, persistConfig) => {
    return async function() {
        let state = await getStoredState(persistConfig)
  
        store.dispatch({
            type: REHYDRATE,
            key: persistConfig.key,
            payload: state,
        })
    }
}

export default CrossBrowserListener;