import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider }  from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga' // 引入redux-saga中的createSagaMiddleware函数
import rootReducer from './reducers' // 引入reducer
import rootSaga from './sagas' // 引入saga

import App from './App'
import './assets/normalize.css' // 引入normalize基本样式
import './assets/styles/app.less' // 引入全局样式

const sagaMiddleware = createSagaMiddleware() // 创建saga中间件

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware)) // 创建store
sagaMiddleware.run(rootSaga) // 运行 saga 中间件

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
