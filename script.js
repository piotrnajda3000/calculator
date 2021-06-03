function add(...numbers) {
    return numbers.reduce((element, total) => total += element, 0)
}

function subtract(...numbers) {
    return numbers.reduce((previous, current) => previous - current)
}

function multiply(...numbers) {

    return numbers.reduce((previous, current) => previous * current)
}

function divide(...numbers) {
    return numbers.reduce((previous, current) => previous * current)
}

const helper = document.querySelector('#helper');
const display = document.querySelector('#display'); 

const numberButtons = document.querySelectorAll('.key'); 
numberButtons.forEach(button => button.addEventListener('click', updateDisplay));

const operators = document.querySelectorAll('.operator');
operators.forEach(button => button.addEventListener('click', operate)); 

const clearButton = document.querySelector('#clear')
clearButton.addEventListener('click', reset);

// Initialize the display
display.textContent = '0'; 
// Calculator evaluates two numbers at a time only, i.e. "12 + 7 - 5 * 3 = should yield 42."
let pair = []; 
let operator; 

function reset(){ 
    display.textContent = '0'; 
    helper.textContent = ''; 
    pair = []; 
    operator = undefined; 
}

function updateDisplay(){  

    const input = this.textContent; 

    if (input == '0' && display.textContent == '0') {
        display.textContent = '0';
        return; 
    }

    if (input != '0' && input != '.' && display.textContent == '0') {
        display.textContent = ''    
    }
    if (input == '.') {

        if (display.textContent.includes('.')) return; 

        else if (display.textContent != '') { 
            display.textContent += '.' 
            return
        }
    }

    // It's a digit if it's not a period
    let digit = input;
    display.textContent += digit; 

}

function operate() {
    if (operator == undefined && pair[0] != undefined) {
        if (this.textContent != '=') {
            operator = this.textContent;
            helper.textContent += ` ${operator} `
        }
    }

    if (pair.length < 2 && display.textContent != '' && !isNaN(display.textContent) 
            && display.textContent != '0') {

            if (this.textContent == '=' && operator == undefined) {
                return;
            }

            pair.push(display.textContent); 
            helper.textContent += ` ${display.textContent} `; 

    }

    if (pair.length == 2 && display.textContent != '') {

        pair = pair.map((x) => parseFloat(x, 10)); 

        let a = pair[0];
        let b = pair[1]; 
        let operatorFunctions = {
            '+': add(a, b),
            '-': subtract(a, b),
            'x': multiply(a, b),
            ':': divide(a, b),
        }
        
        helper.textContent += ` = `; 

        display.textContent = ''; 

        if (a == 0 && b == 0 && operator == ':') {
            alert("Nah.");
            reset(); 
            return; 
        }

        pair = [operatorFunctions[operator]];
        helper.textContent += ` ${pair[0]} `; 

        operator = undefined; 

        }

    let operators = ['+', '-', 'x', ':']; 
    if (operators.includes(this.textContent)) {

        if(operators.includes(helper.textContent.trimEnd().slice(-1))) {
            helper.textContent = helper.textContent.slice(0, -2); 
        }

        operator = this.textContent; 

        helper.textContent += ` ${operator} `;

        display.textContent = ''; 

    }
}


   

   
