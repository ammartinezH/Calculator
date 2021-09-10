import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import ButtonCalc from './components/ButtonCalc'
import {
  getHandleClickAddM, getHandleClickDiffM, getHandleClickMr,
  keyNumbers, keyNumbersOrder, keyOperations,
} from './utils'
import * as utils from './utils'

/**
 * Calculator
 *
 * @component
 * @example
 * <Calculator />
 */
const Calculator = ({
  addOperationToHistory, lastOperation, addM, diffM, mr,
}) => {
  const [val1, setVal1] = useState('')
  const [currentValue, setCurrentValue] = useState('')
  const [result, setResult] = useState('')
  const [isResult, setIsResult] = useState(false)
  const [currentKeyPress, setCurrentKeyPress] = useState('')
  const [operation, setOperation] = useState('') // +, -, *, /
  const inputResult = useRef(null)

  const reset = utils.getReset(setVal1, setOperation, setIsResult, setCurrentValue, setResult)
  const addCharacter = utils.getAddCharacter(currentValue, setCurrentValue)
  // eslint-disable-next-line max-len
  const addOperation = utils.getAddOperation(currentValue, result, reset, operation, setCurrentValue, setOperation, val1, setVal1, setResult, setIsResult)
  const removeLastCharacter = () => {
    setCurrentValue(currentValue.slice(0, -1))
  }
  // eslint-disable-next-line max-len
  const showResult = utils.getShowResult(operation, val1, currentValue, addOperationToHistory, setIsResult, setResult, setCurrentValue, setVal1, setOperation)
  // eslint-disable-next-line max-len
  const calculatorKeyDown = utils.getCalculatorKeyDown(isResult, reset, addCharacter, addOperation, showResult, removeLastCharacter)
  // eslint-disable-next-line max-len
  const handleClickNumberRotation = utils.getHandleClickNumberRotation(isResult, result, currentValue, setIsResult, setResult, setCurrentValue)

  const handleClickAddM = getHandleClickAddM(addM, result || currentValue)
  const handleClickDiffM = getHandleClickDiffM(diffM, result || currentValue)
  const handleClickMr = getHandleClickMr(setResult, setCurrentValue, mr)

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
            {
              val1 && operation
                ? `${val1} ${operation}`
                : lastOperation
            }
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
            active={currentKeyPress === 'ROT'}
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
          <ButtonCalc
            active={currentKeyPress === 'M-'}
            inputResult={inputResult}
            onClick={handleClickDiffM}
            calculatorKeyDown={calculatorKeyDown}
            setCurrentKeyPress={setCurrentKeyPress}
          >
            M-
          </ButtonCalc>
          <ButtonCalc
            active={currentKeyPress === 'M+'}
            inputResult={inputResult}
            onClick={handleClickAddM}
            calculatorKeyDown={calculatorKeyDown}
            setCurrentKeyPress={setCurrentKeyPress}
          >
            M+
          </ButtonCalc>
          <ButtonCalc
            active={currentKeyPress === 'MR'}
            inputResult={inputResult}
            onClick={handleClickMr}
            calculatorKeyDown={calculatorKeyDown}
            setCurrentKeyPress={setCurrentKeyPress}
          >
            MR
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

Calculator.propTypes = {
  addOperationToHistory: PropTypes.func,
  lastOperation: PropTypes.string,
  addM: PropTypes.func,
  diffM: PropTypes.func,
  mr: PropTypes.number,
}

Calculator.defaultProps = {
  addOperationToHistory: null,
  lastOperation: null,
  addM: null,
  diffM: null,
  mr: null,
}

export default Calculator
