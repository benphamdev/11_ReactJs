import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {persistReducer, persistStore} from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
let persistor = persistStore(store)
export {store, persistor}
