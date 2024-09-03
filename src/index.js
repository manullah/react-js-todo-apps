import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import './libs/tailwindcss/tailwindcss.css';
import ProviderReactRouter from './libs/react-router/components/ProviderReactRouter';
import ProviderReactQuery from './libs/react-query/components/ProviderReactQuery';
import AuthProvider from './modules/auth/components/AuthProvider';
import { Toaster } from './libs/shadcn-ui/components/toaster';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ProviderReactQuery>
        <ProviderReactRouter />
        <Toaster />
      </ProviderReactQuery>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
