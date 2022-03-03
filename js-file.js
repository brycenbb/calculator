//Calculator functions

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1/num2;
}

function operate(operator, num1, num2){
    switch(operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            //Operator was not the right type,
            //Need to wait till user inputs 
            //The right type.
        
    }
}
var currentDisplay = ""
var firstNum = null;
var secondNum = null;
var lastPress = "";
var lastDisplay = "";
var operator;

let display = document.querySelector('.text');

//Handling button clicks
const buttons = document.querySelectorAll('button');

// Im going about this the wrong way, the order is
// pick first number, then pick operator, then pick 2nd number

buttons.forEach(button => {
    button.addEventListener('click', function() {
        
        //Decimal button
        if(button.classList.contains('decimal')){
            if(display.textContent.search(".") != -1) {
                return;
            }
            currentDisplay = currentDisplay + "."
        }


        //Operator buttons
        if(button.classList.contains('symbol')) {
            switch(button.textContent){
                case ("\u00F7"):
                    operator = "divide";
                case ("\u00D7"):
                    operator = "multiply";
                case ("-"):
                    operator = "subtract";
                case ("+"):
                    operator = "add";
                case ("="):
                    operator = "equals"
            }

            //Not resetting number if multiple symbols are hit in a row
            if(firstNum === null){
                firstNum = Number(display.textContent);
            }
            //resetting display for next number input
            currentDisplay = "";
            console.log(firstNum);
            return;
        }
        
        //Clear button functionality 
        if(this.textContent === "AC"){
            display.textContent = "";
            currentDisplay = "";
            lastDisplay = "";
            ;
        }
        // Checking if it is either percentage or plus/minus
        else if(this.textContent === "\uFF05" || this.textContent === "\u00B1"){
            if(this.textContent === "\u00B1"){
                if(currentDisplay.charAt(0) === "-"){
                    currentDisplay = currentDisplay.replace("-",""); 
                    display.textContent = currentDisplay;
                }
                else{
                    currentDisplay = "-" + currentDisplay;
                    display.textContent = currentDisplay;
                }
            }
            else {//percentage change stuff}
            }
        }
        //Else is just a normal number
        else{
            lastDisplay = currentDisplay;
            currentDisplay = currentDisplay + this.textContent;
            //Prevents leading zeros
            if((currentDisplay.charAt(0) === "0") && (currentDisplay.length > 1)){
                currentDisplay = currentDisplay.slice(1);
            }
            display.textContent = currentDisplay;
            
        }
        // console.log('clicked');
    })
});
