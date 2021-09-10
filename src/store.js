import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { reducer } from './reducer'

const middlewares = [thunk]

if (!(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test')) {
  middlewares.push(createLogger({ collapse: true }))
}
export const enhancer = composeWithDevTools(applyMiddleware(...middlewares))
export const store = createStore(reducer, enhancer)
