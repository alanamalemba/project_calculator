const btns = document.querySelectorAll(".btn");
const quiz = document.querySelector(".quiz");
const screenAnswer = document.querySelector(".answer");

const clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
  clearScreen();
});

const backspace = document.querySelector("#backspace");
backspace.addEventListener("click", () => {
  removeLastInput();
});

const equals = document.querySelector("#equals");
equals.addEventListener("click", () => {
  screenAnswer.classList.add("answerEquals");
});

let expression;
let answer;
let result = 0;
let operand;
let divd = "\u00F7",
  mltply = "\u00D7",
  adshn = "\u002B",
  sbtrct = "\u2212";

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.id === "clear") return;
    if (btn.id === "equals") return;
    if (btn.id === "backspace") return;
    if (btn.className == "btn operator") {
      quiz.textContent = quiz.textContent + " " + btn.textContent + " ";
      return;
    }
    quiz.textContent = quiz.textContent + btn.textContent;
    expression = quiz.textContent;
    answer = calculateInBodmas();
    if (answer == "NaN") {
      answer = "ERROR";
    }
    screenAnswer.textContent = answer;
  });
});

function calculateInBodmas() {
  let operators = [divd, mltply, sbtrct, adshn];
  let arrayExpression = splitExpression(expression);
  for (let i = 0; i < operators.length; i++) {
    while (arrayExpression.includes(operators[i])) {
      result = calculate(
        arrayExpression[arrayExpression.indexOf(operators[i]) - 1],
        arrayExpression[arrayExpression.indexOf(operators[i])],
        arrayExpression[arrayExpression.indexOf(operators[i]) + 1]
      );

      arrayExpression.splice(
        arrayExpression.indexOf(operators[i]) - 1,
        3,
        result
      );
    }
  }
  return Number(result).toFixed(4);
}

function calculate(firstOperand, operator, secondOperand) {
  firstOperand = parseFloat(firstOperand);
  secondOperand = parseFloat(secondOperand);

  if (operator == divd) {
    return divide(firstOperand, secondOperand);
  } else if (operator == mltply) {
    return multiply(firstOperand, secondOperand);
  } else if (operator == adshn) {
    return add(firstOperand, secondOperand);
  } else if (operator == sbtrct) {
    return subtract(firstOperand, secondOperand);
  }
}

function divide(firstOperand, secondOperand) {
  return firstOperand / secondOperand;
}
function multiply(firstOperand, secondOperand) {
  return firstOperand * secondOperand;
}

function add(firstOperand, secondOperand) {
  return firstOperand + secondOperand;
}

function subtract(firstOperand, secondOperand) {
  return firstOperand - secondOperand;
}

function splitExpression(expression) {
  let arrayExpression = expression.split(" ");
  return arrayExpression;
}

function clearScreen() {
  quiz.textContent = "";
  screenAnswer.textContent = "";
  screenAnswer.classList.remove("answerEquals");
  result = 0;
}

function removeLastInput() {
  screenAnswer.classList.remove("answerEquals");
  if (quiz.textContent.length == 1) {
    quiz.textContent = "";
  }
  quiz.textContent = quiz.textContent.slice(0, -1);
}
