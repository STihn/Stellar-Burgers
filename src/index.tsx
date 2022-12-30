import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import {Provider, useDispatch} from 'react-redux';
import { compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './services/reducers/reducers';
import { BrowserRouter } from 'react-router-dom';
import { wsFeedActions } from './services/actions/actionsFeed';
import { socketMiddleware } from './services/middleware';
import { configureStore } from "@reduxjs/toolkit";

// const composeEnhancers =
// // @ts-ignore
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
// // @ts-ignore
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsFeedActions)));

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(thunk, socketMiddleware(wsFeedActions))
  },
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>  
  </Provider>
,document.getElementById('root')
);

reportWebVitals();
