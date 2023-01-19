const unitArr = ["g", "mg", "mcg"];
let problem = {};
let solution = {};

function generateConversion() {
    let medInput = document.getElementById("med");
    medInput.classList.remove("red", "yellow", "green");
    medInput.value = "";

    problem.from = unitArr[Math.floor(Math.random() * unitArr.length)];
    
    do { //loop if the to conversion is the same as from
        problem.to = unitArr[Math.floor(Math.random() * unitArr.length)];
    } while (problem.to === problem.from);

    problem.distance = Math.abs(unitArr.indexOf(problem.from) - unitArr.indexOf(problem.to));

    if (unitArr.indexOf(problem.from) > unitArr.indexOf(problem.to)) {
        //the problem will need division
        
        if (problem.from === "mcg") {
            problem.fromNum = generateNumber(100000, 900000, 10000);
        } else if (problem.from === "mg") {
            problem.fromNum = generateNumber(1000, 5000, 250);
        }

        if (problem.distance === 1) {
            solution = problem.fromNum / 1000;
        } else {
            solution = (problem.fromNum / 1000) / 1000;
        }
        
    } else {
        //the problem will need multiplication
        
        if (problem.from === "g") {
            problem.fromNum = generateNumber(1, 5);
        } else if (problem.from === "mg") {
            problem.fromNum = generateNumber(1, 10);
        }

        if (problem.distance === 1) {
            solution = problem.fromNum * 1000;
        } else {
            solution = (problem.fromNum * 1000) * 1000;
        }

    }

    let formattedNum;
    let tmpNum = problem.fromNum.toString().split("");

    if (problem.fromNum > 1000 && problem.fromNum < 10000) {
        formattedNum = `${tmpNum[0]},${tmpNum.slice(1).join("")}`
    } else if (problem.fromNum > 100000 && problem.fromNum < 1000000) {
        formattedNum = `${tmpNum.slice(0,3).join("")},${tmpNum.slice(3).join("")}`
    } else {
        formattedNum = tmpNum.join("");
    }

    document.getElementById("problemInfo").textContent = `You need to convert ${formattedNum}${problem.from} to ${problem.to}.`
}

function checkAnswer() {
    let medInput = document.getElementById("med");
    medInput.classList.remove("red", "yellow", "green");

    if (isNaN(medInput.value) || medInput.value === "") {
        medInput.classList.add("yellow");
        alert("Input must be only a number and cannot be blank");
        return
    }

    if (medInput.value == solution) {
        medInput.classList.add("green");
    } else {
        medInput.classList.add("red");
    }
}

generateConversion();

function generateNumber(min, max, by = null) {
    let number = Math.floor(Math.random() * (max - min + 1)) + min;
    if (by != null && by != undefined) {
      return Math.ceil(number / by) * by;
    } else {
      return number;
    }
  }