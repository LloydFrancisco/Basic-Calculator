// Define a variable to store memory value
var memoryValue = '';
// Define a variable to store history of calculations
var calculationHistory = '';

function addToDisplay(value) {
    var displayValue = document.getElementById('display').value;
    // Check if the last character in the display is an operator or a decimal point
    var lastCharIsOperatorOrDecimal = displayValue.match(/[+\-*/.]$/);
    // Check if the value to be added is an operator or a decimal point
    var isOperatorOrDecimal = value.match(/[+\-*/.]/);
    
    // Check if consecutive operators or decimal points are being added
    if (lastCharIsOperatorOrDecimal && isOperatorOrDecimal) {
        // Do not add the value to the display
        return;
    }
    
    // Add the value to the display
    document.getElementById('display').value = displayValue + value;
}

function clearDisplay(source) {
    var currentDisplay = document.getElementById('display').value;
    if (source === 'delete' && currentDisplay.length > 0) {
        // If called from the delete button and there are characters in the display, remove the last one
        var updatedDisplay = currentDisplay.substring(0, currentDisplay.length - 1);
        document.getElementById('display').value = updatedDisplay;
    } else {
        // If called from the AC button or display is already empty, clear it entirely
        document.getElementById('display').value = '';
        // If called from the AC button, also clear the history
        if (source === 'AC') {
            document.getElementById('history').value = '';
        }
    }
}

function calculate() {
    var express = document.getElementById('display').value;
    var output;
    if (/^[\d\s+\-*\/.()]*$/.test(express)) {
        try {
            output = new Function('return ' + express)();
            // Get the current history
            var currentHistory = document.getElementById('history').value;
            // Append the calculation to the current history
            var newHistory = currentHistory + express + ' = ' + output + '\n';
            // Update the history textarea with the new history
            document.getElementById('history').value = newHistory;
            // Ensure that scrollbar remains at the bottom
            document.getElementById('history').scrollTop = document.getElementById('history').scrollHeight;
        } catch (error) {
            output = 'error';
        }
    } else {
        output = 'error';
    }
    // Clear display after calculation
    document.getElementById('display').value = output;
}

function memoryStore() {
    // Store the current display value in memory
    memoryValue = document.getElementById('display').value;
}

function memoryRecall() {
    // Recall the value stored in memory and display it
    document.getElementById('display').value = memoryValue;
}
