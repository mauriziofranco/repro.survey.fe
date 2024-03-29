import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { setupIonicReact } from '@ionic/react';
import '@ionic/react/css/core.css';
import reportWebVitals from './reportWebVitals';
import SurveyView from './SurveyView';
import 'bootstrap/dist/css/bootstrap.css';

setupIonicReact();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SurveyView />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
