

class Calculator {
    constructor(currentOperandTextElement, previousOperandTextElement) {
        this.currentOperandTextElement = currentOperandTextElement
        this.previousOperandTextElement = previousOperandTextElement
        this.clear()
    }


    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }


    displayNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = String(this.currentOperand) + String(number)
    }


    chooseOperation(operation) {
        if (this.currentOperand === '.') return
        if (this.previousOperand !== '.') {
            this.compute()
        }
        this.previousOperand = this.currentOperand + " " + operation
        this.currentOperand = ''
        this.operation = operation
    }

    displayCommas(number) {
        const stringNumber = number.toString() //converting the number to string
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }


    updateDisplay() {
        this.currentOperandTextElement.innerText = this.displayCommas(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.displayCommas(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }


    delete() {
        this.currentOperand = String(this.currentOperand).slice(0, -1)
    }

    compute() {
        let computation
        let prev = parseFloat(this.previousOperand) //parse float check if the first letter of the string is a number and convert it into a number
        let curr = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                computation = prev + curr
                break;
            case '-':
                computation = prev - curr
                break;
            case 'x':
                computation = prev * curr
                break;
            case '/':
                computation = prev / curr
                break;

            default:
                return;
        }
        this.currentOperand = computation
        this.previousOperand = ''
        this.operation = undefined
    }

}
const currentOperandTextElement = document.getElementById('current-operand');
const previousOperandTextElement = document.getElementById('previous-operand');
const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const equalButtons = document.querySelector('[data-equals]');
const resetButton = document.querySelector('[data-reset]');

const calculator = new Calculator(currentOperandTextElement, previousOperandTextElement)

numberButton.forEach(buttons => {
    buttons.addEventListener('click', () => {
        calculator.displayNumber(buttons.textContent)
        calculator.updateDisplay()
    })
})

operationButton.forEach(buttons => {
    buttons.addEventListener('click', () => {
        calculator.chooseOperation(buttons.innerText)
        calculator.updateDisplay()
    })
})

resetButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})


equalButtons.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

//toggle 
let toggleBtn = document.getElementById('toggleButton');
let one = document.getElementById('one')
let two = document.getElementById('two')
let three = document.getElementById('three')


function func1() {
    toggleBtn.classList.add('non-active')
    toggleBtn.classList.remove('active1')
    toggleBtn.classList.remove('active2')
}
function func2() {
    toggleBtn.classList.add('active1')
    toggleBtn.classList.remove('active2')
}
function func3() {
    toggleBtn.classList.add('active2')
    toggleBtn.classList.remove('toggle')
    toggleBtn.classList.remove('active1')
}