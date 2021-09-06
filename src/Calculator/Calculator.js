import React, { useState, useRef } from "react";
import ButtonCalc from "./components/ButtonCalc";
import * as utils from "./utils";

const Calculator = () => {
  const [val1, setVal1] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [result, setResult] = useState("");
  const [isResult, setIsResult] = useState(false);
  const [currentKeyPress, setCurrentKeyPress] = useState("");

  const [operation, setOperation] = useState(""); //+, -, *, /
  const [obj, setObj] = useState([1, 2, 3, 4]);

  const keyNumbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."];
  const keyOperations = ["+", "-", "*", "/"];
  const keyActions = ["Enter", "=", "Delete", "Backspace"];

  const inputResult = useRef(null);

  const regexNumberFloat = /^[+-]?(\d+)?.?(\d+)?$/;

  const addCharacter = (val) => {
    if (!(val === "." && currentValue.includes(val))) {
      let resultFix = currentValue.toString();
      if (!regexNumberFloat.test(currentValue)) {
        resultFix = "";
      }
      setCurrentValue(resultFix + val.toString());
    }
  };

  const addOperation = (val) => {
    if (
      !regexNumberFloat.test(currentValue) ||
      !regexNumberFloat.test(result)
    ) {
      reset();
    } else {
      if (val === "-" && operation !== "-" && !(currentValue || result)) {
        setCurrentValue("-");
      } else {
        setOperation(val);
      }
      if (!val1 && (currentValue || result)) {
        setVal1(currentValue || result);
        setCurrentValue("");
        setResult("");
        setIsResult(false);
      }
    }
  };

  const removeLastCharacter = () => {
    setCurrentValue(currentValue.slice(0, -1));
  };

  const reset = () => {
    setVal1("");
    setOperation("");
    setIsResult(false);
    setCurrentValue("");
    setResult("");
  };

  const showResult = () => {
    if (operation) {
      let operationResult = "";
      switch (operation) {
        case "+":
          operationResult = utils.sum(val1, currentValue).toString();
          break;
        case "-":
          operationResult = utils.dif(val1, currentValue).toString();
          break;
        case "*":
          operationResult = utils.mul(val1, currentValue).toString();
          break;
        case "/":
          operationResult = utils.div(val1, currentValue).toString();
          break;

        default:
          break;
      }
      setIsResult(true);
      setResult(operationResult);
      setCurrentValue("");
      setVal1("");
      setOperation("");
    }
  };

  const calculatorKeyDown = (e) => {
    if (e.key !== "Tab") e.preventDefault();
    if (keyNumbers.includes(e.key)) {
      isResult && reset();
      addCharacter(e.key.toString());
    } else if (keyOperations.includes(e.key)) {
      addOperation(e.key.toString());
    } else if (keyActions.includes(e.key)) {
      if (e.key === "Enter" || e.key === "=") {
        showResult();
      } else if (e.key === "Delete") {
        reset();
      } else if (e.key === "Backspace") {
        removeLastCharacter();
      }
    }
  };
  // console.log({ val1, currentValue, result, isResult, operation });
  return (
    <div>
      <button
        onClick={() => {
          setObj(utils.moveArray(obj));
          setCurrentValue(obj.toString());
        }}
      >
        Number rotation.
      </button>
      <div
        className="calculator"
        onClick={() => {
          inputResult.current.focus();
        }}
      >
        <div className="result">
          <span className="light-result">
            {val1} {operation}
          </span>
          <input
            data-testid="result"
            ref={inputResult}
            tabIndex="1"
            type="text"
            value={result || currentValue}
            onKeyDown={(e) => {
              setCurrentKeyPress(e.key);
              calculatorKeyDown(e);
            }}
            onKeyUp={() => {
              setCurrentKeyPress("");
            }}
            onChange={(e) => {
              setCurrentValue(e.target.value);
            }}
          />
        </div>
        <div className="group-number">
          <ButtonCalc
            active={currentKeyPress === "Delete"}
            inputResult={inputResult}
            onClick={() => reset()}
            calculatorKeyDown={(e) => calculatorKeyDown(e)}
            setCurrentKeyPress={(e) => setCurrentKeyPress(e)}
          >
            C
          </ButtonCalc>
          <ButtonCalc
            active={currentKeyPress === "Backspace"}
            inputResult={inputResult}
            onClick={() => removeLastCharacter()}
            calculatorKeyDown={(e) => calculatorKeyDown(e)}
            setCurrentKeyPress={(e) => setCurrentKeyPress(e)}
          >
            {"<="}
          </ButtonCalc>
        </div>
        <div className="normal-keys">
          <div className="group-number">
            {keyNumbers.map((key) => (
              <ButtonCalc
                active={currentKeyPress === key}
                inputResult={inputResult}
                tabIndex={parseInt(key, 10) + 1}
                key={"button-" + key}
                onClick={() => {
                  isResult && reset();
                  addCharacter(key);
                }}
                calculatorKeyDown={(e) => calculatorKeyDown(e)}
                setCurrentKeyPress={(e) => setCurrentKeyPress(e)}
              >
                {key}
              </ButtonCalc>
            ))}
            <ButtonCalc
              active={currentKeyPress === "=" || currentKeyPress === "Enter"}
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
                key={"button-" + key}
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
  );
};

export default Calculator;
