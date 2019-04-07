import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, createStore} from "redux";
import {combinedReducer as websocketReducers} from "./reducer/WebSocketReducer";
import {combineReducers} from "redux/es/redux";
import {WebsocketMiddleware} from "./middleware/WebsocketMiddleware";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";

const allReducers = {...websocketReducers};

const store = createStore(combineReducers(allReducers), composeWithDevTools(applyMiddleware(WebsocketMiddleware)));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
