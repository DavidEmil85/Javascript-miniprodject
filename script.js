class calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appentNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
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
      case "/":
        computation = prev / current;
        break;
        default:
            return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNan(integerDigits)) {
      integerDisplay = '' 
    } else {
        integerDisplay integerDigits.toLocaleString('eng', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != 0) {
        return `${integerDisplay}.${decimalDigits}` 
    } else {
        return integerDisplay
    }
    
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = 
     this.getDisplayNumber
    (this.currentOperand)
    if (this.operation != null) {
        this.previousOperandTextElement.innerText = 
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    }  else{
        this.previousOperandTextElement.innerTex =''

    }

  }

 const numberButtons = document.querySelectorAll("[data-number]");
 const operationButtons = document.querySelectorAll("[data-operations]");
 const equalsButton = document.querySelectorAll("[data-equals]");
 const deleteButton = document.querySelectorAll("[data-delete]");
 const allClearButton = document.querySelectorAll("[data-all-clear]");
 const previousOperandTextElement = document.querySelectorAll("[data-equals]");
 const currentOperandTextElement = document.querySelectorAll("[data-equals]");

 const calculator = new calculator(
 previousOperandTextElement,
 currentOperandTextElement);

 numberButtons.forEach(button) {
     button.addEventListener("click", () => {
         calculator.appentNumber(button.innerText);
         calculator.updateDisplay();
     });
 };

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appentNumber(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});