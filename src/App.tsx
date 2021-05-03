import React, { useState } from "react";
import { evaluate } from "mathjs";
import ButtonsPanel from "./ButtonPanel";
import Display from "./Display";
import "./App.css";

const App: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>("0");

  function calculaValor(displayValue: string, inverter : boolean ){
    try {
      if (displayValue !== "Invalid value"){
        const replacedValue = displayValue.replace("x", "*").replace("÷", "/");
        const value: number = evaluate(replacedValue);
        if (inverter)
          setDisplayValue((value*-1).toString());
        else
        setDisplayValue((value).toString());
      }
    }
    catch{
      setDisplayValue("Invalid value");
    }
  }

  function handleClick(event: React.FormEvent<HTMLInputElement>): void {
    const buttonName: string = event.currentTarget.innerText;
    if (buttonName === "AC") setDisplayValue("0");
    else if (buttonName === "+/-"){
      calculaValor(displayValue, true);
    }
    else if (buttonName === "=") {
      calculaValor(displayValue, false);
    } else {
      if (displayValue === "0" || displayValue === "Invalid value")
        setDisplayValue(buttonName);
      else
        setDisplayValue((value) => `${value}${buttonName}`);
    }
  }

  return (
    <div className="component-app">
      <Display value={displayValue} />
      <ButtonsPanel handler={handleClick} />
    </div>
  );
};

export default App;
