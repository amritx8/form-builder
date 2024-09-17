// libraires
import React from 'react';
import ReactDOM from 'react-dom/client';

// components
import { App } from './App';

// css
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
