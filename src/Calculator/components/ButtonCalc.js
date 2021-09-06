import React from "react";

const ButtonCalc = (props) => {
  return (
    <div className="wrapper-button">
      <div
        tabIndex={props.tabIndex || 0}
        role="button"
        aria-pressed="false"
        className={`button-calc ${props.active && "active"}`}
        onClick={(e) => {
          props.onClick(e);
        }}
        onKeyDown={(e) => {
          props.setCurrentKeyPress(e.key);
          if (e.key === "Enter") {
            props.onClick();
          } else if (!(e.key === "Tab" || e.key === "Shift")) {
            e.preventDefault();
            props.inputResult.current.focus();
            props.calculatorKeyDown(e);
          }
        }}
        onKeyUp={() => {}}
      >
        {props.children}
      </div>
    </div>
  );
};

export default ButtonCalc;
