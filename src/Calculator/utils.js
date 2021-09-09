export const sum = (a, b) => parseFloat(a) + parseFloat(b)
export const dif = (a, b) => parseFloat(a) - parseFloat(b)
export const mul = (a, b) => parseFloat(a) * parseFloat(b)
export const div = (a, b) => parseFloat(a) / parseFloat(b)

export const moveArray = (obj) => {
  obj.push(obj.shift())
  return obj
}

export const keyNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
export const keyNumbersOrder = ['9', '6', '7', '8', '3', '4', '5', '0', '1', '2', '10']
export const keyOperations = ['+', '-', '*', '/']
export const keyActions = ['Enter', '=', 'Delete', 'Backspace']
export const regexNumberFloat = /^[+-]?(\d+)?.?(\d+)?$/

export const getReset = (setVal1, setOperation, setIsResult, setCurrentValue, setResult) => () => {
  setVal1('')
  setOperation('')
  setIsResult(false)
  setCurrentValue('')
  setResult('')
}

export const getAddCharacter = (currentValue, setCurrentValue) => (val) => {
  if (!(val === '.' && currentValue.includes(val))) {
    let resultFix = currentValue.toString()
    if (!regexNumberFloat.test(currentValue)) {
      resultFix = ''
    }
    setCurrentValue(resultFix + val.toString())
  }
}
// eslint-disable-next-line max-len
export const getAddOperation = (currentValue, result, reset, operation, setCurrentValue, setOperation, val1, setVal1, setResult, setIsResult) => (val) => {
  if (!regexNumberFloat.test(currentValue) || !regexNumberFloat.test(result)) {
    reset()
  } else {
    if (val === '-' && operation !== '-' && !(currentValue || result)) {
      setCurrentValue('-')
    } else {
      setOperation(val)
    }
    if (!val1 && (currentValue || result)) {
      setVal1(currentValue || result)
      setCurrentValue('')
      setResult('')
      setIsResult(false)
    }
  }
}

// eslint-disable-next-line max-len
export const getShowResult = (operation, val1, currentValue, addOperationToHistory, setIsResult, setResult, setCurrentValue, setVal1, setOperation) => () => {
  if (operation) {
    let operationResult = ''
    switch (operation) {
      case '+':
        operationResult = sum(val1, currentValue)
          .toString()
        break
      case '-':
        operationResult = dif(val1, currentValue)
          .toString()
        break
      case '*':
        operationResult = mul(val1, currentValue)
          .toString()
        break
      case '/':
        operationResult = div(val1, currentValue)
          .toString()
        break

      default:
        break
    }
    if (addOperationToHistory && operationResult) {
      addOperationToHistory(`${val1} ${operation} ${currentValue} = ${operationResult}`)
    }
    setIsResult(true)
    setResult(operationResult)
    setCurrentValue('')
    setVal1('')
    setOperation('')
  }
}

// eslint-disable-next-line max-len
export const getCalculatorKeyDown = (isResult, reset, addCharacter, addOperation, showResult, removeLastCharacter) => (e) => {
  if (e.key !== 'Tab') e.preventDefault()
  if (keyNumbers.includes(e.key)) {
    isResult && reset()
    addCharacter(e.key.toString())
  } else if (keyOperations.includes(e.key)) {
    addOperation(e.key.toString())
  } else if (keyActions.includes(e.key)) {
    if (e.key === 'Enter' || e.key === '=') {
      showResult()
    } else if (e.key === 'Delete') {
      reset()
    } else if (e.key === 'Backspace') {
      removeLastCharacter()
    }
  }
}

// eslint-disable-next-line max-len
export const getHandleClickNumberRotation = (isResult, result, currentValue, setIsResult, setResult, setCurrentValue) => () => {
  const numberToRotation = isResult ? result : currentValue
  setIsResult(false)
  setResult('')
  setCurrentValue(moveArray(numberToRotation.split(''))
    .join(''))
}
