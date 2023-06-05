import CartReducer from './CartReducer'  


import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
/*const stripe = require('stripe')('sk_test_51MhCu6GvNDcqKZN0B4SuaoDH7HMiNLNf9AbpEvHKOYeBtYVR2aqyzn2vlWuzLYcmKsLG54JSvgRJdjkeAaCNPTNs005rKPNLHf');
*/

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, CartReducer)
export const store = configureStore({
  reducer: {
    cart:persistedReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)

