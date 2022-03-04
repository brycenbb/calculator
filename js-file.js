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
var currentDisplay = "0";
var firstNum = null;
var secondNum = null;
var lastPress = "";
var lastDisplay = "";
var operator;
var lastSymbol = null;

let display = document.querySelector('.text');
display.textContent = "0";
//Handling button clicks
const buttons = document.querySelectorAll('button');
console.log(display.textContent);
// Im going about this the wrong way, the order is
// pick first number, then pick operator, then pick 2nd number

buttons.forEach(button => {
    button.addEventListener('click', function() {
        
        //Decimal button
        if(button.classList.contains('decimal')){
            if(!(display.textContent.search(/\./) === -1)) {
                return;
            }
            currentDisplay = currentDisplay + "."
            display.textContent = currentDisplay;
        }
        //Operator buttons
        else if(button.classList.contains('symbol')) {
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

            // button.parentNode.style.border = "3px solid black";
            // button.parentNode.style.width = String(button.parentNode.style.width - 2);
            

            //Highlighting most recent symbol pressed
            button.parentNode.style.backgroundColor = "darkorange";

            if(lastSymbol != null){
                // lastSymbol.parentNode.style.border = "1px solid black";
                lastSymbol.parentNode.style.backgroundColor = "orange";

            }
            lastSymbol = button;


            //Not resetting number if multiple symbols are hit in a row
            if(firstNum === null){
                firstNum = Number(display.textContent);
            }
            //Resetting display for next number input
            currentDisplay = "0";
            console.log(firstNum);
            return;
        }
        //Clear button functionality, need to restructure for 2 presses
        else if(this.textContent === "AC"){
            display.textContent = "0";
            currentDisplay = "0";
            lastDisplay = "";
            ;
        }
        // Alternating between plus/minus
        else if(this.textContent === "\u00B1"){
            if(currentDisplay.charAt(0) === "-"){
                currentDisplay = currentDisplay.replace("-",""); 
                display.textContent = currentDisplay;
            }
            else{
                currentDisplay = "-" + currentDisplay;
                display.textContent = currentDisplay;
            }
        }
        //Percentage button
        else if(button.classList.contains('percentage')){
            if(display.textContent.search(/\./) != -1){
                let index = display.textContent.search(/\./);
                display.textContent = display.textContent.replace(".","");
                if(index < 2){
                    let counter = index;

                    //Accounting for leading zeroes in smaller numbers
                    while(counter < 2){
                        counter++;
                        display.textContent = "0" + display.textContent;
                    }
                    display.textContent = "0." + display.textContent;
                    return;
                }
                //There are at least 2 numbers to the left of the '.'
                if(index === 2){
                    display.textContent = "." + display.textContent;
                }
                else{
                    display.textContent = display.textContent.slice(0,index-2) + "." + display.textContent.slice(index-2);
                }

            }
            //There is no '.' currently in the number
            else{
                let length = display.textContent.length -1;
                if(length === 2) {
                    display.textContent = "." + display.textContent;
                }
                else{
                    display.textContent = display.textContent.slice(0,length-1) + "." + display.textContent.slice(length-1);
                }
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

        //Outside conditions checking for type of button
        //
        //

        //Accounting for leftmost zero for readability
        if(display.textContent.charAt(0) === "."){
            display.textContent = "0" + display.textContent;
            currentDisplay = display.textContent;
        }
        // console.log('clicked');
    })
});
