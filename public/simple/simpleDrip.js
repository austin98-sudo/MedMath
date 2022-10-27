let problem;
let solution;

/**
 * Problem:
 *
 * Total amount infused, round by 250's
 * Amount of hours
 * The drip set [15,60]
 */

/**
 * Solution:
 *
 * Drips per minute
 */

const dripSets = [15, 60];
const answerBtn = document.getElementById("answerBtn");

function generateSimpleDrip() {
  problem = {
    //generate the problem
    amount: generateNumber(500, 5000, 250),
    hours: generateNumber(2, 48, 1),
    dripSet: dripSets[generateNumber(0, 1, 1)],
  };

  //prettier-ignore
  solution = {
    //generate the solution
    upper: (((problem.amount/problem.hours)/60)*problem.dripSet)+2,
    lower: (((problem.amount/problem.hours)/60)*problem.dripSet)-2
  }

  //Display problem info
  document.getElementById("problemInfo").textContent = `You are ordered to give ${problem.amount}mL's with a ${problem.dripSet} drop set over the next ${problem.hours} hours. How many drips per minute will you do?`;

  //Resets inputs and classes for button
  answerBtn.textContent = "Check Answer";
  answerBtn.classList.remove("green");
  //Resets input and classes for input
  document.getElementById("dripmL").value = "";
  document.getElementById("dripmL").classList.remove("green", "yellow", "red");
}

function checkAnswer() {
  const dripmL = document.getElementById("dripmL");

  dripmL.classList.remove("green", "yellow", "red");

  if (isNaN(dripmL.value) || dripmL.value === "") {
    //checks to make sure input is a number and is not blank
    alert("Drips per minute must be a number and cannot be blank");
    dripmL.classList.add("yellow");
    return;
  }

  if (dripmL.value >= solution.lower && dripmL.value <= solution.upper) {
    //answer is correct
    dripmL.classList.add("green");
    answerBtn.classList.add("green");
    answerBtn.textContent = "Correct";
  } else {
    //answer is incorrect
    dripmL.classList.add("red");
    answerBtn.classList.add("red");
    answerBtn.textContent = "Incorrect";

    //wait 2 seconds then reset button classes and text
    setTimeout(() => {
      answerBtn.classList.remove("red");
      answerBtn.textContent = "Check Answer";
    }, 2000);
  }
}

function generateNumber(min, max, by) {
  let number = Math.floor(Math.random() * (max - min + 1)) + min;
  if (by != null && by != undefined) {
    return Math.ceil(number / by) * by;
  } else {
    return number;
  }
}

generateSimpleDrip();
