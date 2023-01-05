class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        //Whenever calculator initializes, the clear() cleans up
        this.clear()
    }

    clear() {
        //Empty value '' defaulted as empty string
        this.currentOperand = ''
        this.previousOperand = ''
        //Don't have any operations selected, if clear() called
        this.operation = undefined
    }

    delete() {
        //Converting current operand to string and calling slice for 0 and last element in the set
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        //"." for only entering once, the includes for checking and returning no more than one period key
        if (number === '.' && this.currentOperand.includes('.')) return
        //All elements converted as string for concatenation purpose to give (1+1=11) and not (1+1=2)
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        //Defining operations should not work without numbers, if so attempetd give "return"
        if (this.currentOperand === '') return
        //If there is already values in previous and user gives new value to current operand, calling compute() function
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        //Ater clicking operation, assigning current operand to previous operand to move up for next inputs
        this.previousOperand = this.currentOperand
        //So current operand gets cleared for new inputs
        this.currentOperand = ''
    }

    compute() {
        //Computation going to be the result of our mathematical  operations
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        //If there is no previous or current value, the compute() should not work
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        //Assigning the answer to computation variable
        this.currentOperand = computation
        this.operation = undefined
        //Previous operand will get empty string
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        //Numbers get converted to string for splitting before and after periods
        const stringNumber = number.toString()

        //Number before period named as Integer
        const integerDigits = parseFloat(stringNumber.split('.')[0])

        //Number after period named as Decimal
        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay
        //If input is not a number, return an empty string
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            //maximumFractionDigits make sures, there is no more commas after an integer with a period
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            //If user enters number, period and number, the period gets added.
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
            //Calling getDisplayNumeber for "," based display
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            //If there is some operation, the operation must also moved to previous operand with the number with concatenation
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            //After computation, result comes, the previous operand gets empty set
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        //updateDisplay() constantly updates, when each and every number gets appended and similarly all updateDisplay() works
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        //chooseOperation() uses switch case for entering mathematical operations
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    //When equalsButton clicked, all the values gets computed()
    calculator.compute()
    //After compute() update the values to screen
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})