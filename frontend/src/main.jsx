import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    {/* <React.StrictMode> */}
    <Provider store={store} >
      <App />
    </Provider>
    {/* </React.StrictMode> */}
  </ChakraProvider>
)