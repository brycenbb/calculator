
//Calculator functions
function add(num1, num2) {
    return trim((num1 + num2).toFixed(6));
}

function subtract(num1, num2) {
    return trim((num1 - num2).toFixed(6));
}

function multiply(num1, num2) {
    return trim((num1 * num2).toFixed(6));
}

function divide(num1, num2) {
    return trim((num1/num2).toFixed(6));
}

function trim (string) {
    while(string.charAt(string.length-1) === "0"){
        string = string.slice(0,string.length -1);
    }
    if(string.charAt(string.length-1)=== ".") {
        string = string.slice(0,string.length -1);
    }
    return string;
}

function operate(operator, num1, num2){
    switch(operator) {
        case "add":
            return add(num1, num2);
        case "subtract":
            return subtract(num1, num2);
        case "multiply":
            return multiply(num1, num2);
        case "divide":
            return divide(num1, num2);
        default:
            //Should not get here
            console.log("ERROR IN OPERATOR FUNCTION");
    }
}

function plusMinusPressed() {
    repeatNum1 = null;
    repeatNum2 = null;
    lastEquate = false;
    if((display.textContent.length === 1) && (display.textContent === "0")){
        return;
    }

    if(display.textContent.charAt(0) === "-"){
        currentDisplay = currentDisplay.replace("-",""); 
        display.textContent = display.textContent.replace("-","");
    }
    else{
        currentDisplay = "-" + currentDisplay;
        display.textContent = "-" + display.textContent;
    }
}

function percentagePressed() {
    repeatNum1 = null;
    lastEquate = false;
    //Not allowing it on singular 0
    if((display.textContent.length === 1) && (display.textContent === "0")){
        return;
    }

    //Moving the '.'
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
        //If there are at least 2 numbers to the left of the '.'
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

//Button on-press functions
function decimalPressed() {
    if(!(display.textContent.search(/\./) === -1)) {
        return;
    }
    currentDisplay = currentDisplay + "."
    display.textContent = currentDisplay;
    repeatNum1 = null;
    repeatNum2 = null;
}

function clearPressed() {
    display.textContent = "0";
    currentDisplay = "0";
    lastDisplay = "";
    firstNum = null;
    secondNum = null;
    repeatNum1 = null;
    repeatNum2 = null;
    lastEquate = false;
    adjust = 0;
    tempOperator = null;
    lastOperator = null;
    lastButtonType = null;

    if(lastSymbol != null){
        lastSymbol.parentNode.style.backgroundColor = "orange";
        lastSymbol = null;
    }
}

function symbolPressed(button){

    if(lastButtonType === "number"){
        if(firstNum === null){
            firstNum = Number(display.textContent);
        }
        else{
            secondNum = Number(display.textContent);
            equate = true;
            console.log(secondNum);
        }
    }

    console.log("firstNum", firstNum);
    console.log("secondNum", secondNum);
    console.log("equate", equate);

    switch(button.textContent){
        case ("\u00F7"):
            operator = "divide";
            break;
        case ("\u00D7"):
            operator = "multiply";
            break;
        case ("-"):
            operator = "subtract";
            break;
        case ("+"):
            operator = "add";
            // console.log("got to setting teh add flag");
            break;
        case ("="):
            console.log("setting equate to true, = was pressed");
            equate = true;
            secondNum = Number(display.textContent);
            // console.log("firstNum", firstNum);
            // console.log("secondNum", secondNum);
            break;
    }

    //Not resetting number if multiple symbols are hit in a row
    if(firstNum === null){
        firstNum = Number(display.textContent);
        // console.log(firstNum);
    }
    //Handles continuous evaluation without needing to hit "="
    if((firstNum != null) && (secondNum != null) && lastButtonType === "number"){
        equate = true;
        tempOperator = operator;
        operator = lastOperator;
    }
    
    //Highlighting only most recent symbol pressed
    if(lastSymbol != null){
        lastSymbol.parentNode.style.backgroundColor = "orange";
    }
    button.parentNode.style.backgroundColor = "darkorange";
    lastSymbol = button;


    //Not resetting number if multiple symbols are hit in a row
    if(firstNum === null){
        firstNum = Number(display.textContent);
    }

    //Resetting display for next number input
    currentDisplay = "0";

    lastButtonType = "symbol";

    //Equals functionality
    if(equate) {
        console.log("got inside equate check");
        if(lastEquate){
            // console.log("got inside multi equals");
            repeatNum2 = Number(display.textContent);
            display.textContent = operate(operator,repeatNum2,repeatNum1);
            // firstNum = Number(display.textContent);
            secondNum = null;
        }
        else if((firstNum != null) && secondNum != null){
                console.log("operating!");
                display.textContent = operate(operator,firstNum,secondNum);
                repeatNum1 = secondNum;
                secondNum = null;
                firstNum = null;
                //Putting this in makes it so continuous evaluation works but breaks
                //independent evaluation....SAD.
                // firstNum = Number(display.textContent);
                lastEquate = true;
        }
        
        equate = false;
    }
    
    if(tempOperator != null){
        operator = tempOperator;
        tempOperator = null;
    }
    lastOperator = operator;

    return;
    //End of operator button functionality
}

function numberPressed(button){
    lastButtonType = "number";
    repeatNum1= null;
    lastEquate = false;

    // if(lastButtonType === "symbol"){
    //     if(firstNum != null){
    //         firstNum = Number(display.textContent);
    //     }
    //     else{
    //         secondNum = Number(button.textContent);
    //         console.log(secondNum);
    //     }
    // }

    

    if(lastSymbol != null){
        lastSymbol.parentNode.style.backgroundColor = "orange";
        lastSymbol = null;
    }

    lastDisplay = currentDisplay;
    currentDisplay = currentDisplay + button.textContent;
    
    //Prevents leading zeros
    if((currentDisplay.charAt(0) === "0") && (currentDisplay.length > 1)){
        currentDisplay = currentDisplay.slice(1);
    }
    display.textContent = currentDisplay;
}

function readability() {
    //Accounting for leftmost zero for readability
    if(display.textContent.charAt(0) === "."){
        display.textContent = "0" + display.textContent;
        currentDisplay = display.textContent;
    }
    //Making sure negative symbol is the leftmost item
    if((display.textContent.search('-') != -1) && (display.textContent.charAt(0) != "-")){
        display.textContent = display.textContent.replace("-","");
        display.textContent = "-" + display.textContent;
    }

    //Adjusting size based on how long the display text is
    if(display.textContent.length > 10){
        adjust += 0.3;
        if(display.textContent.length > 20) {
            adjust -= 0.15;
        }
        let newFont = Math.max(8-adjust,2.5);
        display.style.fontSize = String(newFont) + "vh";
        // console.log(adjust);
        // console.log(display.style.fontSize);
    }
    else{
        display.style.fontSize = "8vh";
    }

    if(display.textContent.length > 30) {
        setTimeout(function() {
            display.textContent = "ERROR"
        },300)
        const force = new Event('click');
        const element = document.querySelector('#clear');
        element.dispatchEvent(force);

    }
}

//Click transition event, making it flash lighter
const buttonsNoSymbols = document.querySelectorAll('button:not(.symbol)');
buttonsNoSymbols.forEach(element => {
    element.addEventListener('click', function() {
        element.parentNode.classList.add('brighter');
        setTimeout(function() {
            element.parentNode.classList.remove('brighter');
        },50);
    });
});

//Click transition event for symbols, making it flash darker
const symbolButtons = document.querySelectorAll('.symbol');
symbolButtons.forEach(element => {
    element.addEventListener('click',function(){
        element.parentNode.classList.add('darker');
        setTimeout(function() {
            // console.log("got to darker");
            element.parentNode.classList.remove('darker');
        },50);
    });
});


//current bugs: does not clear after a sum when the user 
// tries to operate on two new numbers
// Also the text just gets smaller if the length is over
// 10 and you hit the +/- button over and over


var currentDisplay = "0";
var firstNum = null;
var secondNum = null;
var lastDisplay = "";
var operator = null;
var lastSymbol = null;
var equate = false;
var lastEquate = false;
var repeatNum1 = null;
var repeatNum2 = null;
var lastButtonType = null;
var lastOperator = null;
var tempOperator = null;
let adjust = 0;


//Initializing display
let display = document.querySelector('.text');
display.textContent = "0";


//Handling button clicks
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        //Decimal button
        if(button.classList.contains('decimal')){
           decimalPressed();
        }
        //Operator buttons
        else if(button.classList.contains('symbol')) {
            symbolPressed(button);
        }
        //Clear button functionality
        else if(this.textContent === "AC"){
            clearPressed();
        }
        // Alternating between plus/minus
        else if(this.textContent === "\u00B1"){
            plusMinusPressed();
        }
        //Percentage button
        else if(button.classList.contains('percentage')){
            percentagePressed();
        }
        //Else is just a normal number
        else{
            numberPressed(button);
        }
        //Cleaning up display based on various conditions
        readability();
    })
});
