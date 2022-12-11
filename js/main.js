const output = document.querySelector(".output");
// const allButtons = document.querySelectorAll(".calc_btn");
const allButtons = document.querySelectorAll(".buttons")[0];
const history = document.querySelector(".history");


// let firstNumber = "";
// let secondNumber = "";

let withDot = true;
let operations = []; ['1', '+', '5', '-' , '9']
let operation = "";
let finish = false;

function clearAll() {
  operations = [];
  firstNumber = "";
  secondNumber = "";
  operation = "";
  finish = false;
  output.textContent = 0;
  history.textContent = "";
}

const numbersArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operationArr = ["-", "+", "*", "÷"];

allButtons.addEventListener("click", (e) => {
  if (!e.target.classList.contains("calc_btn")) return;

  let value = e.target.value;
  console.log(value);

  if (value === "C") {
    clearAll();
    return;
  }
  
  // if (value !== "=") {
  //   let result = (history.textContent += value);
  //   console.log(result);
  // }

  // ( 0-9 / . )true
  if (numbersArr.includes(value)) {
    if (finish) {
      clearAll()
    }

    if (operation) {
      operations.push(operation, value);
    } else if (!operations.length) {
      operations = [value];
    } else {
      operations[operations.length - 1] = withDot ? `${operations[operations.length - 1]}.${value}` : `${operations[operations.length - 1]}${value}`
    }

    output.textContent = operations.join(" ");
    operation = ""
    withDot = false

    return;
  }

  if (value === '.') {
    if (finish) {
      finish = false
      history.textContent = ""
      operations = [output.textContent]
    }

    if(operations.length && !operations[operations.length - 1].includes('.')) {
      withDot = true
      output.textContent = operations.join(" ") + '.'
      operation = ""
    }

    return;
  }

  // (+, -, ×, /)true
  if (operationArr.includes(value)) {
    if (finish) {
      finish = false
      history.textContent = ""
      operations = [output.textContent]
    }

    operation = value;
    output.textContent = operations.join(" ") + " " + value;
  }

  // (=)true
  if (value === "=") {
    history.textContent = operations.join(" ")
    finish = true;
    operation = ""

    const copy = [...operations] // [1, +, 24, -, 5/6]

    let i = 1

    while(true) {
        if(i >= copy.length) break
        const currentOperation = copy[i] // +
  
        if(!["*", "÷"].includes(currentOperation)) {
          i += 2;
          continue;
        }
        
        const firstValue = copy[i - 1] // 5
        const secondValue = copy[i + 1] // 6
        let res;
  
        switch(currentOperation) {
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
    while(true) {
      if(copy.length === 1) break
      const currentOperation = copy[i] // -
      
      const firstValue = copy[i - 1] // 25
      const secondValue = copy[i + 1] // 5/6
      let res;

      switch(currentOperation) {
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