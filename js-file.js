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
    num1/num2;
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
var firstNum = 0;
var secondNum = 0;
var lastDisplay = "";



let display = document.querySelector('.text');

//Handling button clicks
const buttons = document.querySelectorAll('button');
console.log(buttons);

//Tried making a for loop instead of for each loop
// for(i = 0; i < buttons.length;i++){

//     //Checking if decimal button was hit
//     if(buttons[i].classList.contains('decimal')){
//         if(display.textContent.search(".") != -1){
//             continue;
//         }
//         currentDisplay = currentDisplay + ".";


//     }
// }



buttons.forEach(button => {
    button.addEventListener('click', function() {
        //Operator buttons
        if(button.classList.contains('decimal')){
            if(display.textContent.search(".") != -1) {
                return;
            }
            currentDisplay = currentDisplay + "."
        }
        
        
        
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
        else{
            lastDisplay = currentDisplay;
            currentDisplay = currentDisplay + this.textContent;
            display.textContent = currentDisplay;
        }
        // console.log('clicked');
    })
});
