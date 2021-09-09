export const initState = {
  operations: [],
}

const calculator = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_NEW_OPERATION':
      return { ...state, operations: state.operations.concat(action.operation) }
    default:
      return state
  }
}

export const getLastOperation = (state) => {
  if (state.calculator.operations.length) {
    return state.calculator.operations[state.calculator.operations.length - 1]
  }
  return null
}

export default calculator
