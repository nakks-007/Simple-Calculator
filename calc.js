class Calculator {
    constructor(previousScreenTextElement, currentScreenTextElement) {
        this.previousScreenTextElement = previousScreenTextElement
        this.currentScreenTextElement = currentScreenTextElement
        this.clear()
    }

    clear() {
        this.currentScreen = ''
        this.previousScreen = ''
        this.operation = undefined
    }

    delete() {

    }

    addNumber(number) {
        this.currentScreen = number
    }

    chooseOperation(operation) {

    }

    compute() {

    }

    updateDisplay() {
        this.currentScreenTextElement.innerText = this.currentScreen
    }
}

const numberButtons = document.querySelectorAll('[dataNumber]');
const operationButtons = document.querySelectorAll('[dataOperation]');
const delBtn = document.querySelector('[dataDelete]');
const clrBtn = document.querySelector('[dataClear]');
const equalBtn = document.querySelector('[dataEqual]');
const previousScreenTextElement = document.querySelector('[dataPreviousScreen]');
const currentScreenTextElement = document.querySelector('[dataCurrentScreen]');

const calculator = new Calculator(previousScreenTextElement, currentScreenTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addNumber(button.innerText)
        calculator.updateDisplay()
    })
})