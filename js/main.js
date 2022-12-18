const output = document.querySelector(".output");
const allButtons = document.querySelectorAll(".buttons")[0];
const history = document.querySelector(".history");

let operations = [];
let finish = false;

function clearAll() {
  operations = [];
  finish = false;
  output.textContent = "0";
  history.textContent = "";
}

const dot = '.';
const numbersArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const actionArr = ["-", "+", "*", "÷"];

const getLastOperation = () => {
  return operations[operations.length - 1]
}

const setLastOperation = (value) => {
  operations[operations.length - 1] = value
}


const setDefaultOperation = () => {
  operations = ['0']
}

const checkIsAction = (value) => {
  return actionArr.includes(value)
}

const clearLastAction = () => {
  const lastOperation = getLastOperation()

  if (checkIsAction(lastOperation)) {
    operations.pop()
  }
}

const formatOperationValue = (value) => {
  const lastSymbol = value[value.length - 1]
  if (lastSymbol === dot) {
    return value.substring(0, value.length - 1)
  }

  return value
}

const addDigit = (value) => {
  if (finish) {
    clearAll()
  }

// actionArr.includes(operations[operations.length - 1])

  const lastOperation = getLastOperation()

  if (!lastOperation || checkIsAction(lastOperation)) {
    operations.push(value);
  } else {
    setLastOperation(lastOperation + value)
  }

  output.textContent = operations.join(" ");
}

const addAction = (value) => {
  if (finish) {
    finish = false
    history.textContent = ""
    operations = [output.textContent]
  }

  clearLastAction()

  operations.push(value)

  output.textContent = operations.join(" ");
}

const addDot = () => {
  if (finish) {
    finish = false
    history.textContent = ""
    operations = [output.textContent]
  }

  clearLastAction()

  const lastOperation = getLastOperation()
  const existsDot = lastOperation.includes('.')

  if (!existsDot) {
    setLastOperation(getLastOperation() + dot)
  }

  output.textContent = operations.join(" ");
}

const calculate = () => {
  clearLastAction();
  history.textContent = operations.join(" ");
  finish = true;

  const copy = [...operations];

  let i = 1;

  while (true) {
    if (i >= copy.length) break;
    const currentOperation = copy[i] // +

    if (!["*", "÷"].includes(currentOperation)) {
      i += 2;
      continue;
    }

    const firstValue = copy[i - 1] // 5
    const secondValue = copy[i + 1] // 6
    let res;

    switch (currentOperation) {
      case "*":
        res = Number(firstValue) * Number(secondValue)
        break;
      case "÷":
        res = Number(firstValue) / Number(secondValue)
        break;
      default:
        break;
    }

    copy.splice(i - 1, 3, res)
  }

  i = 1

  // [25 5/6]
  while (true) {
    if (copy.length === 1) break
    const currentOperation = copy[i] // -

    const firstValue = copy[i - 1] // 25
    const secondValue = copy[i + 1] // 5/6
    let res;

    switch (currentOperation) {
      case "+":
        res = Number(firstValue) + Number(secondValue)
        break;
      case "-":
        res = Number(firstValue) - Number(secondValue)
        break;
      default:
        break;
    }

    copy.splice(i - 1, 3, res)
  }

  output.textContent = copy[0];
}

allButtons.addEventListener("click", (e) => {
  if (!e.target.classList.contains("calc_btn")) return;

  let value = e.target.value;

  // ( 0-9 / . )true
  if (numbersArr.includes(value)) {
    addDigit(value)

    return;
  }

  if (!operations.length) {
    setDefaultOperation()
  }

  if (value === '.') {
    addDot()

    return;
  }

  // Clear dot in the end
  const lastOperation = getLastOperation()
  setLastOperation(formatOperationValue(lastOperation))

  if (value === "C") {
    clearAll();
    return;
  }

  // (+, -, ×, /)true
  if (actionArr.includes(value)) {
    addAction(value)

    return;
  }

  // (=)true
  if (value === "=") {
    calculate()
  }
});

// allButtons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     let value = e.target.value;

//     switch (value) {
//       case "C":
//         history.textContent = "";
//         output.textContent = "0";
//         break;
//       case "=":
//         try {
//           history.textContent = eval(history.textContent);
//         } catch {
//           history.textContent = "";
//         }
//         break;

//       default:
//         history.textContent += value;
//         if ((value = "=")) return;
//         output.textContent = value;
//     }
//   });
// });