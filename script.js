function add(...numbers) {
  return numbers.reduce((element, total) => (total += element), 0);
}

function subtract(...numbers) {
  return numbers.reduce((previous, current) => previous - current);
}

function multiply(...numbers) {
  return numbers.reduce((previous, current) => previous * current);
}

function divide(...numbers) {
  return numbers.reduce((previous, current) => previous * current);
}

const helper = document.querySelector("#helper");
const display = document.querySelector("#display");

const numberButtons = document.querySelectorAll(".key");
numberButtons.forEach((button) =>
  button.addEventListener("click", () => updateDisplay(button.textContent))
);

const operators = document.querySelectorAll(".operator");
operators.forEach((button) =>
  button.addEventListener("click", () => evaluate(button.textContent))
);

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", reset);

display.textContent = "";

// Calculator evaluates only a pair of numbers at a time, i.e. "12 + 7 - 5 * 3 = should yield 42."
// 12 + 7 = 19
// 19 - 5 = 14
// 14 * 3 = 42

let pair = [];
let operator;

function reset() {
  display.textContent = "";
  helper.textContent = "";
  pair = [];
  operator = undefined;
}

function updateDisplay(clickedNumber) {
  if (clickedNumber == ".") {
    if (display.textContent.includes(".")) return;

    if (display.textContent == "") {
      display.textContent += "0.";
    } else {
      display.textContent += ".";
    }
    return;
  }

  if (display.textContent == "0") {
    if (clickedNumber == "0") {
      return;
    } else {
      display.textContent = "";
    }
  }

  display.textContent += clickedNumber;
}

function evaluate(inputOperator) {
  // Handle inputting a negative first number
  if (operator == undefined && pair[0] == undefined) {
    if (inputOperator == "-" && !display.textContent.includes("-")) {
      display.textContent += "-";
    } else if (inputOperator == "+" && display.textContent == "-") {
      display.textContent = "";
    }
  }

  if (operator == undefined && pair[0] != undefined) {
    // can't '=' a single number
    if (inputOperator != "=") {
      operator = inputOperator;
      helper.textContent += ` ${operator} `;
    }
  }

  // Add a number to the pair
  if (
    pair.length < 2 &&
    display.textContent != "" &&
    display.textContent != "0" &&
    !isNaN(display.textContent)
  ) {
    if (inputOperator == "=" && operator == undefined) {
      return;
    }

    pair.push(display.textContent);

    helper.textContent += ` ${display.textContent} `;
  }

  // Operate on the pair
  if (pair.length == 2 && display.textContent != "") {
    pair = pair.map((x) => +x);

    let [a, b] = [...pair];

    if (a == 0 && b == 0 && operator == ":") {
      alert("Not on my watch!");
      reset();
      return;
    }

    let evaluatePair = {
      "+": add(a, b),
      "-": subtract(a, b),
      x: multiply(a, b),
      ":": divide(a, b),
    };

    // The result becomes the first number in pair in next operation
    pair = [roundResult(evaluatePair[operator])];

    helper.textContent += ` = `;
    helper.textContent += ` ${pair[0]} `;

    display.textContent = "";
    b = undefined;
    operator = undefined;
  }

  let operators = ["+", "-", "x", ":"];

  // User decides to change the operator, i.e. 3 + -> 3 -
  if (operators.includes(inputOperator) && pair[0] != undefined) {
    if (operators.includes(helper.textContent.trimEnd().slice(-1))) {
      helper.textContent = helper.textContent.slice(0, -2);
    }

    operator = inputOperator;

    helper.textContent += ` ${operator} `;

    display.textContent = "";
  }
}

function roundResult(result) {
  return Math.round(result * 1000) / 1000;
}
