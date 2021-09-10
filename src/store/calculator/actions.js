import { getMr } from './reducers'

export const addOperation = (operation) => (dispatch) => {
  dispatch({ type: 'ADD_NEW_OPERATION', operation })
}

export const addM = (val) => (dispatch, getState) => {
  const value = getMr(getState()) + val
  dispatch({ type: 'SET_MR', value })
}

export const diffM = (val) => (dispatch, getState) => {
  const value = getMr(getState()) - val
  dispatch({ type: 'SET_MR', value })
}
