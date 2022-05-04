//generate problem data and get neccessary IDs
let dynamicDripProblem = {
  hours: 0,
  weight: 0,
  dripSet: 60,
  medicationDosage: 0,
  supply: 0,
};

let dynamicDripSolution = {
  dripsMin: 0,
  kg: 0,
  medicationGiven: 0,
};

let problemWeight = document.getElementById("dynamic-drip-weight");
let problemOrder = document.getElementById("dynamic-drip-ordered");
let problemHour = document.getElementById("dynamic-drip-hours");

function generateDynamicDrip() {
  //generate new problem details
  dynamicDripProblem.weight = generateNumber(100, 350, 5);
  dynamicDripProblem.hours = generateNumber(6, 24, 1);
  dynamicDripProblem.medicationDosage = generateNumber(0.5, 3, 1);
  let tmpSolution = dynamicDripProblem.weight * dynamicDripProblem.medicationDosage;
  dynamicDripProblem.supply = generateNumber(tmpSolution, tmpSolution + 500, 50);

  //display problem details
  document.getElementById(
    "dynamic-drip-problem"
  ).innerText = `You have a patient who weighs ${dynamicDripProblem.weight}lbs. You have been ordered to give ${dynamicDripProblem.medicationDosage}mg/kg, the medication comes with ${dynamicDripProblem.supply}mg in a 1,000mL bag of fluid and you want to give the medicaiton over ${dynamicDripProblem.hours} hours`;

  solveDynamicDrip();
}

function solveDynamicDrip() {
  dynamicDripSolution.kg = dynamicDripProblem.weight / 2.2;
  let tmpSolution = 0;
  tmpSolution = dynamicDripSolution.kg * dynamicDripProblem.medicationDosage; //multiplies the weight by the ordered amount
  let newSupply = dynamicDripProblem.supply / 1000;
  tmpSolution = tmpSolution / newSupply;
  tmpSolution = tmpSolution / dynamicDripProblem.hours; //divides the solution by the number of hours
  tmpSolution = tmpSolution * 60; //multiplies by the drip set
  tmpSolution = tmpSolution / 60; //divides by 60 minutes

  dynamicDripSolution.dripsMin = tmpSolution;
  dynamicDripSolution.medicationGiven = dynamicDripSolution.kg * dynamicDripProblem.medicationDosage;
  console.log(dynamicDripSolution);
}

function checkDynamicDrip() {
  let dripsMin = document.getElementById("answer-dynamicDripsMin");
  let weight = document.getElementById("answer-dynamicDripWeight");
  let medGiven = document.getElementById("answer-dynamicDripMed");
  let answerBtn = document.getElementById("check-dynamic-drip-answer");

  dripsMin.value === "" ? dripsMin.classList.add("incorrect") : dripsMin.classList.remove("incorrect");
  weight.value === "" ? weight.classList.add("incorrect") : weight.classList.remove("incorrect");
  medGiven.value === "" ? medGiven.classList.add("incorrect") : medGiven.classList.remove("incorrect");
  if (dripsMin.value === "" || weight.value === "" || medGiven.value === "") {
    answerBtn.classList.add("incorrect");
    answerBtn.innerText = "Answer(s) cannot be blank";
    setTimeout(() => {
      answerBtn.classList.remove("incorrect");
      answerBtn.innerText = "Check Answer";
    }, 2500);
  }
}
