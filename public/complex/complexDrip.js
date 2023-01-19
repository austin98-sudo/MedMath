let problem;
let solution;

/**
 * Problem:
 *
 * Weight
 * Ordered dosage
 * Amount of medication in the mL's
 * Amount of mL
 */

/**
 * Solution:
 *
 * Weight in kg
 * Amount of medication given
 * Drips per minute
 */

const possibleDosage = [0.01, 0.1, 0.5];
const salineBags = [100, 250, 500, 1000];

const weight = document.getElementById("weight");
const med = document.getElementById("med");
const dripmL = document.getElementById("dripmL");

function generateComplexDrip() {
  weight.classList.remove("red", "yellow", "green");
  med.classList.remove("red", "yellow", "green");
  dripmL.classList.remove("red", "yellow", "green");

  weight.value = "";
  med.value = "";
  dripmL.value = "";

  problem = {
    weight: generateNumber(50, 500, 5),
    dosage: possibleDosage[Math.floor(Math.random() * possibleDosage.length)],
    saline: generateNumber(100, 1500, 50),
  };

  problem.med = generateNumber(problem.saline+500, problem.saline + 2000, 50);

  //calculate some of the problem to determine if problem needs regenerated
  let kg = problem.weight/2.2;
  let concentration = problem.med/problem.saline;
  let drips = (kg * problem.dosage * 60)/concentration;

  if (drips > 300) {
    //if drips are over 250 rerun function to create better problem
    console.clear();
    generateComplexDrip();
    return;
  }

  solution = {
    kg: {
      upper: kg + 2,
      lower: kg - 2,
    },
    medication: {
      upper: (kg * problem.dosage) + 2.5,
      lower: (((kg * problem.dosage) - 2.5) > 0) ? (kg * problem.dosage) - 2.5 : 0,
    },
    dripNum: {
      upper: drips + 5,
      lower: ((drips - 5) > 0) ? drips - 5 : 0,
    }
  }

  console.table(solution);

  document.getElementById("problemInfo").textContent = `You are ordered to give ${problem.dosage}mg/kg/min of a medication to a ${problem.weight}lb patient. You are supplied with a ${problem.med}mg/${problem.saline}mL bag of the medication. Please determine the patients weight in kg, the amount of medication you will administer per minute and how many drops per minute you will need.`

}

function checkAnswer() {
  weight.classList.remove("red", "yellow", "green");
  med.classList.remove("red", "yellow", "green");
  dripmL.classList.remove("red", "yellow", "green");

  if (weight.value === "") {
    weight.classList.add("yellow");
    alert("Weight must be a number and cannot be blank");
  } else if (weight.value < solution.kg.upper && weight.value > solution.kg.lower) {
    weight.classList.add("green");
  } else {
    weight.classList.add("red");
  }

  if (med.value === "") {
    med.classList.add("yellow");
    alert("Amount of medication must be a number and cannot be blank");
  } else if (med.value < solution.medication.upper && med.value > solution.medication.lower) {
    med.classList.add("green");
  } else {
    med.classList.add("red")
  }

  if (dripmL.value === "") {
    dripmL.classList.add("yellow");
    alert("Drips must be a number and cannot be blank");
  } else if (dripmL.value < solution.dripNum.upper && dripmL.value > solution.dripNum.lower) {
    dripmL.classList.add("green");
  } else {
    dripmL.classList.add("red");
  }
}

function generateNumber(min, max, by = null) {
  let number = Math.floor(Math.random() * (max - min + 1)) + min;
  if (by != null && by != undefined) {
    return Math.round(number / by) * by;
  } else {
    return number;
  }
}

generateComplexDrip();
