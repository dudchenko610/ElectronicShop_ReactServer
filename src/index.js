import React from "react"
import ReactDOM from "react-dom"
import thunk from 'redux-thunk'

import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"

import registerServiceWorker from "./core/registerServiceWorker.js";

import App from "./app/common/base/App"
import {allReducers} from "./app/common/reducers/all-reducers"

import { Router } from "react-router-dom"
import {createBrowserHistory} from 'history'

export const store = createStore(allReducers, applyMiddleware(thunk));

// создаём кастомную историю
const history = createBrowserHistory()

ReactDOM.render
    ( 
        <Router history={history}> 
            <Provider store={store}>
                <App />
            </Provider>
        </Router>,
        document.getElementById("root")
    );

registerServiceWorker();
