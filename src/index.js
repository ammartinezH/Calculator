import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import App from './App'

import calculator from './store/calculator/reducers'

const reducer = combineReducers({
  calculator,
})
const middlewares = [thunk]

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger({ collapse: true }))
}

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)))

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement,
)
