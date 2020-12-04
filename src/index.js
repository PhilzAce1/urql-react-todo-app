import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createClient, Provider } from 'urql';
// import { client } from './client';

const client = createClient({
  url: 'https://graphql.fauna.com/graphql',
  fetchOptions: {
    headers: {
      authorization: `Bearer ${process.env.REACT_APP_FAUNA_SECRET}`,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
