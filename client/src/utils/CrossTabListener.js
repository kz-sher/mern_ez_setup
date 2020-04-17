import { getStoredState, REHYDRATE } from 'redux-persist'

const CrossTabListener = (store, persistConfig) => {
    return async function() {
        let state = await getStoredState(persistConfig)
  
        store.dispatch({
            type: REHYDRATE,
            key: persistConfig.key,
            payload: state,
        })
    }
}

export default CrossTabListener;