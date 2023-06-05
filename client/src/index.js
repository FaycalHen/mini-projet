import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './Redux/store';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react'
import Admin from './pages/Admin/Admin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={"loading"} persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>  
  </React.StrictMode>
);
