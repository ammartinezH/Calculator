export const addOperation = (operation) => (dispatch) => {
  dispatch({ type: 'ADD_NEW_OPERATION', operation })
}
