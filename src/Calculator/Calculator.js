import React, { useState, useRef } from 'react'
import ButtonCalc from './components/ButtonCalc'
import * as utils from './utils'

/**
 * Calculator
 *
 * @component
 * @example
 * <Calculator />
 */
const Calculator = () => {
  const [val1, setVal1] = useState('')
  const [currentValue, setCurrentValue] = useState('')
  const [result, setResult] = useState('')
  const [isResult, setIsResult] = useState(false)
  const [currentKeyPress, setCurrentKeyPress] = useState('')

  const [operation, setOperation] = useState('') // +, -, *, /

  const keyNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
  const keyNumbersOrder = ['9', '6', '7', '8', '3', '4', '5', '0', '1', '2', '10']
  const keyOperations = ['+', '-', '*', '/']
  const keyActions = ['Enter', '=', 'Delete', 'Backspace']

  const inputResult = useRef(null)

  const regexNumberFloat = /^[+-]?(\d+)?.?(\d+)?$/

  const reset = () => {
    setVal1('')
    setOperation('')
    setIsResult(false)
    setCurrentValue('')
    setResult('')
  }

  const addCharacter = (val) => {
    if (!(val === '.' && currentValue.includes(val))) {
      let resultFix = currentValue.toString()
      if (!regexNumberFloat.test(currentValue)) {
        resultFix = ''
      }
      setCurrentValue(resultFix + val.toString())
    }
  }

  const addOperation = (val) => {
    if (
      !regexNumberFloat.test(currentValue)
      || !regexNumberFloat.test(result)
    ) {
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

  const removeLastCharacter = () => {
    setCurrentValue(currentValue.slice(0, -1))
  }

  const showResult = () => {
    if (operation) {
      let operationResult = ''
      switch (operation) {
        case '+':
          operationResult = utils.sum(val1, currentValue).toString()
          break
        case '-':
          operationResult = utils.dif(val1, currentValue).toString()
          break
        case '*':
          operationResult = utils.mul(val1, currentValue).toString()
          break
        case '/':
          operationResult = utils.div(val1, currentValue).toString()
          break

        default:
          break
      }
      setIsResult(true)
      setResult(operationResult)
      setCurrentValue('')
      setVal1('')
      setOperation('')
    }
  }

  const calculatorKeyDown = (e) => {
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

  const handleClickNumberRotation = () => {
    const numberToRotation = isResult ? result : currentValue
    setIsResult(false)
    setResult('')
    setCurrentValue(utils.moveArray(numberToRotation.split('')).join(''))
  }

  return (
    <div>
      <div
        role="button"
        tabIndex="0"
        className="calculator"
        onClick={() => {
          inputResult.current.focus()
        }}
        onKeyDown={(e) => {
          !(e.key === 'Shift' || e.key === 'Tab') && inputResult.current.focus()
        }}
      >
        <div className="result">
          <span className="light-result">
            {val1}
            {' '}
            {operation}
          </span>
          <input
            data-testid="result"
            ref={inputResult}
            tabIndex="0"
            type="text"
            value={result || currentValue}
            onKeyDown={(e) => {
              setCurrentKeyPress(e.key)
              calculatorKeyDown(e)
            }}
            onKeyUp={() => {
              setCurrentKeyPress('')
            }}
            onChange={(e) => {
              setCurrentValue(e.target.value)
            }}
          />
        </div>
        <div className="group-number--delete">
          <ButtonCalc
            active={currentKeyPress === 'Delete'}
            inputResult={inputResult}
            onClick={() => reset()}
            calculatorKeyDown={(e) => calculatorKeyDown(e)}
            setCurrentKeyPress={(e) => setCurrentKeyPress(e)}
          >
            C
          </ButtonCalc>
          <ButtonCalc
            active={currentKeyPress === 'Delete'}
            inputResult={inputResult}
            onClick={handleClickNumberRotation}
            calculatorKeyDown={calculatorKeyDown}
            setCurrentKeyPress={setCurrentKeyPress}
          >
            ROT
          </ButtonCalc>
          <ButtonCalc
            active={currentKeyPress === 'Backspace'}
            inputResult={inputResult}
            onClick={() => removeLastCharacter()}
            calculatorKeyDown={(e) => calculatorKeyDown(e)}
            setCurrentKeyPress={(e) => setCurrentKeyPress(e)}
          >
            {'<='}
          </ButtonCalc>
        </div>
        <div className="normal-keys">
          <div className="group-number">
            {keyNumbers.map((key, index) => (
              <ButtonCalc
                order={keyNumbersOrder[index]}
                active={currentKeyPress === key}
                inputResult={inputResult}
                key={`button-${key}`}
                onClick={() => {
                  isResult && reset()
                  addCharacter(key)
                }}
                calculatorKeyDown={(e) => calculatorKeyDown(e)}
                setCurrentKeyPress={(e) => setCurrentKeyPress(e)}
              >
                {key}
              </ButtonCalc>
            ))}
            <ButtonCalc
              order="11"
              active={currentKeyPress === '=' || currentKeyPress === 'Enter'}
              inputResult={inputResult}
              onClick={() => showResult()}
              calculatorKeyDown={(e) => calculatorKeyDown(e)}
              setCurrentKeyPress={(e) => setCurrentKeyPress(e)}
            >
              =
            </ButtonCalc>
          </div>
          <div className="group-operators">
            {keyOperations.map((key) => (
              <ButtonCalc
                active={currentKeyPress === key}
                inputResult={inputResult}
                key={`button-${key}`}
                onClick={() => addOperation(key)}
                calculatorKeyDown={(e) => calculatorKeyDown(e)}
                setCurrentKeyPress={(e) => setCurrentKeyPress(e)}
              >
                {key}
              </ButtonCalc>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator
