import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'vivy/build/index.css';
// 记录页面性能
import reportWebVitals from './reportWebVitals';

// 1.render
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // 2.再public里找index.html
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
