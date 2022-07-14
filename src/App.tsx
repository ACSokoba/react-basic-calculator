import { FormEvent, SetStateAction, useRef } from "react";
import { useReducer } from "react";
import { useState } from "react";
// import { TbDivide } from "react-icons/tb";

import "./App.css";

function App() {
  const input = useRef(0);
  const [buffer, setBuffer] = useState([""]);
  const [displayedValue, setDisplayedValue] = useState(0);
  const [currentBufferIndex, setCurrentBufferIndex] = useState(0);

  function isNumber(value: string) {
    return Number.parseInt(value) <= 9 && Number.parseInt(value) >= 0;
  }

  function dispatch(value: string) {
    if (isNumber(value)) {
      console.log("its a number");
      if (buffer[currentBufferIndex]) {
        buffer[currentBufferIndex] = buffer[currentBufferIndex] + value;
      } else {
        buffer[currentBufferIndex] = value;
      }
      setDisplayedValue(+buffer[currentBufferIndex]);
    }
    if (value === "+") {
      updateBuffer(buffer, value);
    }
    if (value === "/") {
      updateBuffer(buffer, value);
    }
    if (value === "-") {
      updateBuffer(buffer, value);
    }
    if (value === "x") {
      updateBuffer(buffer, value);
    }
    if (value === ".") {
      updateBuffer(buffer, value);
    }
    if (value === "c") {
      setBuffer([""]);
      setDisplayedValue(0);
      setCurrentBufferIndex(0);
    }
    console.log("buffer at the end is", buffer);
  }

  function executeOperation(buffer: string[]) {
    console.log("in executeOP");
    let newBuffer = structuredClone(buffer);
    if (newBuffer[1] === "+") {
      return (+newBuffer[0] + +newBuffer[2]).toString();
    } else if (newBuffer[1] === "-") {
      return (+newBuffer[0] - +newBuffer[2]).toString();
    } else if (newBuffer[1] === "/") {
      return (+newBuffer[0] / +newBuffer[2]).toString();
    } else if (newBuffer[1] === "x") {
      return (+newBuffer[0] * +newBuffer[2]).toString();
    } else {
      return "";
    }
  }

  function handlePrecision(passedBuffer: string[]) {
    return passedBuffer[0].split(".")[1].length > 14
      ? +(
          passedBuffer[0].split(".")[0] +
          "." +
          passedBuffer[0].split(".")[1].slice(0, 14)
        )
      : +passedBuffer[0];
  }
  
  function updateBuffer(passedBuffer: string[], operation: string) {
    if (passedBuffer.length === 3) {
      console.log("lenght  = 3");
      if (operation !== ".") {
        passedBuffer[0] = executeOperation(buffer);
        passedBuffer[1] = operation;
        passedBuffer.pop();
        setBuffer(passedBuffer);
        setDisplayedValue(handlePrecision(passedBuffer));
        setCurrentBufferIndex(2);
      } else {
        passedBuffer[currentBufferIndex] += ".";
      }
    } else {
      if (operation !== ".") {
        passedBuffer.push(operation);
        setCurrentBufferIndex(2);
      } else {
        passedBuffer[currentBufferIndex] += ".";
        setBuffer(passedBuffer);
      }
    }
  }
  return (
    <div className="app">
      <div className="app-container">
        <div>
          <input
            type="text"
            value={displayedValue}
            className="calculatorInput"
          />
        </div>
        <div className="calculatorContainer">
          <div className="calculatorGridContainer">
            <button className="calculatorButton" onClick={() => dispatch("7")}>
              7
            </button>
            <button className="calculatorButton" onClick={() => dispatch("8")}>
              8
            </button>
            <button className="calculatorButton" onClick={() => dispatch("9")}>
              9
            </button>
            <button className="calculatorButton" onClick={() => dispatch("x")}>
              x
            </button>
            <button className="calculatorButton" onClick={() => dispatch("4")}>
              4
            </button>
            <button className="calculatorButton" onClick={() => dispatch("5")}>
              5
            </button>
            <button className="calculatorButton" onClick={() => dispatch("6")}>
              6
            </button>
            <button className="calculatorButton" onClick={() => dispatch("+")}>
              +
            </button>
            <button className="calculatorButton" onClick={() => dispatch("1")}>
              1
            </button>
            <button className="calculatorButton" onClick={() => dispatch("2")}>
              2
            </button>
            <button className="calculatorButton" onClick={() => dispatch("3")}>
              3
            </button>
            <button className="calculatorButton" onClick={() => dispatch("-")}>
              -
            </button>
            <button className="calculatorButton" onClick={() => dispatch("c")}>
              C
            </button>
            <button className="calculatorButton" onClick={() => dispatch("0")}>
              0
            </button>
            <button className="calculatorButton" onClick={() => dispatch(".")}>
              .
            </button>
            <button className="calculatorButton" onClick={() => dispatch("/")}>
              /
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
