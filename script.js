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

    if (display.textContent == '0') {

        if (digit == '.') {
            display.textContent += digit; 
        }
        else {
            display.textContent = digit; 
        }

    }    
    else {
        display.textContent += digit; 
    }

}

let operator; 

function operate() {

    if (pair.length < 2 && display.textContent != '') {
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

        pair = [operatorFunctions[operator]];
        helper.textContent += ` ${pair[0]} `; 

        console.log(a, operator, b); 

        }

    let operators = ['+', '-', 'x', ':']; 
    if (operators.includes(this.textContent)) {
        operator = this.textContent; 

        if(helper.textContent.trimEnd().slice(-1) != operator) {
            helper.textContent += ` ${operator} `; 
        }
        display.textContent = ''; 
    }


}


    

   

   
