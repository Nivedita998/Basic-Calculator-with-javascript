class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = "";
  }

  delete() {
    //it will first convert number to string and then slice it from opposite direction so we used -1 and last index
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    //this will stop '.' too add more than one time
    if (number === "." && this.currentOperand.includes(".")) return;

    //converting number into string because if it is number than it will add like 1 + 1 = 2 and if it is string 1 + 1 = 11
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    //if current operand is  empty then do nothing
    if (this.currentOperand === "") return;

    //if previous operand is not  empty then run compute function
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    //if both prev and current number is not a number then do nothing
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }

    //updating values to currentOperand and operation and previousOperand
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  //for updating result  seperated by commas like 5,555,558
  getDisplayNumber(number) {
    //converting number to string to use split fuction
    const stringNumber = number.toString();

    //Integer digit will print before side of decimall
    const integerDigits = parseFloat(stringNumber.split(".")[0]);

    //Decimal digit will print after side of decimal
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    //check if have decimal in
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDispay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

//elements selected
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const allClearButton = document.querySelector("[data-all-clear]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const previousOperandTextElement = document.querySelector(
  "[data-privious-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

//for numbers
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDispay();
  });
});

//for operations
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDispay();
  });
});

//to compute
equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDispay();
});

//all clear button
allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDispay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDispay();
});
