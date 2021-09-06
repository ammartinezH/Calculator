import React from 'react';
import PropTypes from 'prop-types';

/**
 * Calculators button
 *
 * @component
 * @example
 * <ButtonCalc
 * active={currentKeyPress === key}
 * inputResult={inputResult}
 * tabIndex={0} // ("0" || "-1")
 * key={`button-1`}
 * onClick={(e) => onclick(e)}
 * calculatorKeyDown={(e) => calculatorKeyDown(e)}
 * setCurrentKeyPress={(e) => setCurrentKeyPress(e)}
 * >
 * Text to show on button
 * </ButtonCalc>
 */
const ButtonCalc = ({
  tabIndex, active, onClick, setCurrentKeyPress, inputResult, calculatorKeyDown, children,
}) => (
  <div className="wrapper-button">
    <div
      tabIndex={tabIndex || 0}
      role="button"
      aria-pressed="false"
      className={`button-calc ${active && 'active'}`}
      onClick={(e) => {
        onClick(e);
      }}
      onKeyDown={(e) => {
        setCurrentKeyPress(e.key);
        if (e.key === 'Enter') {
          onClick();
        } else if (!(e.key === 'Tab' || e.key === 'Shift')) {
          e.preventDefault();
          inputResult.current.focus();
          calculatorKeyDown(e);
        }
      }}
      onKeyUp={() => {}}
    >
      {children}
    </div>
  </div>
);

ButtonCalc.propTypes = {
  tabIndex: PropTypes.oneOf(['0', '-1']),
  active: PropTypes.bool,
  onClick: PropTypes.func,
  setCurrentKeyPress: PropTypes.func,
  inputResult: PropTypes.element,
  calculatorKeyDown: PropTypes.func,
  children: PropTypes.element,
};

ButtonCalc.defaultProps = {
  tabIndex: 0,
  active: false,
  onClick: null,
  setCurrentKeyPress: null,
  inputResult: null,
  calculatorKeyDown: null,
  children: null,

};
export default ButtonCalc;
