/* Main calculator operation */ 
function add(...numbers) {
    let total = 0; 
    numbers.forEach(number => total += number);
    return total; 
}

function subtract(...numbers) {
    let total = 0; 
    for (let i = 0; i < numbers.length - 1; i++) {
        total += numbers[i] - numbers[i + 1]; 
    }
    return total; 
}

function multiply(...numbers) {
    // Multiply each number with the next number in an array.
    while (numbers.length != 1) {
        let temp = numbers[0]; 
        numbers.shift(); 
        numbers[0] = temp * numbers[0]; 
    } 
    return numbers[0];
}

function divide(...numbers) {
    // Multiply each number with the next number in an array.
    while (numbers.length != 1) {
        let temp = numbers[0]; 
        numbers.shift(); 
        numbers[0] = temp / numbers[0]; 
    } 
    return numbers[0];
}

let a;
let b; 
let operator; 

const display = document.querySelector('#display'); 
// Initialize the display and number
display.textContent = 0; 

const clearButton = document.querySelector('#clear')
clearButton.addEventListener('click', clear);
function clear(){ 
    display.textContent = 0; 
    a = undefined;
    b = undefined;
    operator = undefined; 
}

const numberButtons = document.querySelectorAll('.key'); 
numberButtons.forEach(button => button.addEventListener('click', updateDisplay));
function updateDisplay(){    
    const digit = this.textContent; 

    if (display.textContent == 0) {
        display.textContent = digit;
    }    

    else {
        display.textContent += digit; 
    }

}

const operators = document.querySelectorAll('.operator');
operators.forEach(button => button.addEventListener('click', prepareOperation)); 
function prepareOperation(){

    if (a != undefined) {
        operate(); 
        display.textContent = '0'; 
        operator = this.textContent;
        return; 
    }

    if (a == undefined) {
        operator = this.textContent;
        a = display.textContent; 
        display.textContent = '0'; 
    }

}

const equals = document.querySelector('#equals'); 
equals.addEventListener('click', operate); 
function operate() {
    b = display.textContent; 

    a = parseFloat(a);
    b = parseFloat(b); 

    let operatorFunctions = {
        '+': add(a, b),
        '-': subtract(a, b),
        'x': multiply(a, b),
        ':': divide(a, b),
    }

    display.textContent = operatorFunctions[operator];
    a = display.textContent; 
    b = undefined; 

}
