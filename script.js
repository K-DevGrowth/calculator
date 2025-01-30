const container = document.querySelector("#container");
const input = document.querySelector("input");
const calculateBtn = document.querySelector("#calculate");
const addBtn = document.querySelector("#add");
const subtractBtn = document.querySelector("#subtract");
const multiplyBtn = document.querySelector("#multiply");
const divideBtn = document.querySelector("#divide");
const numberBtns = document.querySelectorAll(".number");
const clearBtn = document.querySelector("#clear");
const screen = document.querySelector("#screen-last");
const deleteBtn = document.querySelector("#delete");
const operatorBtns = [addBtn, subtractBtn, multiplyBtn, divideBtn];

let isActive = false;
let number1 = null;
let operator = '';
let number2 = null;

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) =>  num1 * num2;
const divide = (num1, num2) => num2 !== 0 ? 
                                num1 / num2 : 
                                screen.textContent = "Lmao";

const operate = (number1, operator, number2) => {
    let result;
    switch (operator) {
        case "+": result = add(number1, number2); break;
        case "-": result = subtract(number1, number2); break;
        case "*": result = multiply(number1, number2); break;
        case "/": result = divide(number1, number2); break;
        default: result = "Error";
    }

    input.value = Number(parseFloat(result).toFixed(6));
    return result;
}

const clear = () => {
    input.value = "";
    screen.textContent = "";
    operator = "";
    number1 = null;
    number2 = null;
    isActive = false;
    operatorBtns.map(btn => btn.classList.remove("active"))
}

const deleted = () => {
    input.value = input.value.toString().slice(0, -1);
    number1 = parseFloat(input.value);
    screen.textContent = input.value;
}

numberBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        input.value += e.target.value;
        screen.textContent += e.target.value;
        if (isActive) {
            number2 = parseFloat(input.value);
        }
        else {
            number1 = parseFloat(input.value);
        }
        
        operatorBtns.forEach(btn => btn.classList.remove("active"));
    })
})

operatorBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        operator = e.target.value;
        screen.textContent = input.value;
        screen.textContent += e.target.value;
        input.value = "";
        input.placeholder = "";
        isActive = true;

        operatorBtns.forEach(btn => btn.classList.remove("active"));
        btn.classList.add("active");
    })
})

calculateBtn.addEventListener("click", () => {
    if (number1 !== null && operator && number2 !== null) {
        screen.textContent += "=";
        const result = operate(number1, operator, number2);
        number1 = result;
    }
    else {
        screen.textContent = "Error";
    }
});

clearBtn.addEventListener("click", clear);

deleteBtn.addEventListener("click", deleted);

input.addEventListener("keyup", (e) => {
    console.log(e.key)
    if (e.key === "Backspace") {
        deleted();
    }
    if (e.key === "Enter" && number1 !== null && operator && number2 !== null) {
        operate(number1, operator, number2);
    }
})

