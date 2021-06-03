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

const display = document.querySelector('#display'); 

const clearButton = document.querySelector('#clear')
clearButton.addEventListener('click', clear);

const numberButtons = document.querySelectorAll('.key'); 
numberButtons.forEach(button => button.addEventListener('click', updateDisplay));

const operators = document.querySelectorAll('.operator');
operators.forEach(button => button.addEventListener('click', operate)); 

const helper = document.querySelector('#helper');

// Initialize the display
display.textContent = '0'; 
let pair = []; 

function clear(){ 
    display.textContent = '0'; 
    helper.textContent = ''; 
    pair = []; 
    operator = undefined; 
}

function updateDisplay(){  

    const digit = this.textContent; 

    if (digit == '0' && display.textContent == '0') {
        display.textContent = '0';
        return; 
    }

    if (digit == '.' && !display.textContent.includes('.') && display.textContent != '') {
        display.textContent += digit; 
        return;
    }

    if (digit != '0' && digit != '.' && display.textContent == '0') {
            display.textContent = '';      
    }

    if (digit != '.') {
    display.textContent += digit; 
    }

}

let operator; 

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
            clear(); 
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


   

   
