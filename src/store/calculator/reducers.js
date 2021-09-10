export const initState = {
  operations: [],
  mr: 0,
}

const calculator = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_NEW_OPERATION':
      return { ...state, operations: state.operations.concat(action.operation) }
    case 'SET_MR': {
      return { ...state, mr: action.value }
    }
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

export const getMr = (state) => state.calculator.mr

export default calculator
