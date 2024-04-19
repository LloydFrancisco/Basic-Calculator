let memoryValue = '';
let calculationHistory = '';

function addToDisplay(value) {
    let displayValue = document.getElementById('display').value;
    let lastCharIsOperatorOrDecimal = displayValue.match(/[+\-*/.]$/);
    let isOperatorOrDecimal = value.match(/[+\-*/.]/);
    
    if (lastCharIsOperatorOrDecimal && isOperatorOrDecimal) {
        return;
    }
    
    document.getElementById('display').value = displayValue + value; 
}

function clearDisplay(source) {
    let currentDisplay = document.getElementById('display').value;
    if (source === 'delete' && currentDisplay.length > 0) {
        let updatedDisplay = currentDisplay.substring(0, currentDisplay.length - 1);
        document.getElementById('display').value = updatedDisplay; // Remove the last character from the display if called from the delete button
    } else {
        document.getElementById('display').value = ''; // Clear the display entirely if called from the AC button or if display is already empty
        if (source === 'AC') {
            document.getElementById('history').value = ''; // Also clear the history if called from the AC button
        }
    }
}

function calculate() {
    let express = document.getElementById('display').value;
    let output;
    if (/^[\d\s+\-*\/.()]*$/.test(express)) { // Validate the expression using regular expression
        try {
            output = new Function('return ' + express)(); // Evaluate the expression
            let currentHistory = document.getElementById('history').value;
            let newHistory = currentHistory + express + ' = ' + output + '\n'; // Append the calculation to the current history
            document.getElementById('history').value = newHistory;
            document.getElementById('history').scrollTop = document.getElementById('history').scrollHeight; // Ensure that scrollbar remains at the bottom
        } catch (error) {
            output = 'error';
        }
    } else {
        output = 'error';
    }
    document.getElementById('display').value = output;
}

function memoryStore() {
    memoryValue = document.getElementById('display').value;
}

function memoryRecall() {
    document.getElementById('display').value = memoryValue; 
}
