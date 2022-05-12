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

const generateDynamicDrip = () => {
  //generate new problem details
  dynamicDripProblem.weight = generateNumber(100, 350, 5);
  dynamicDripProblem.hours = generateNumber(1, 8, 1);
  dynamicDripProblem.medicationDosage = generateNumber(0.5, 3, 1);
  let tmpSolution = dynamicDripProblem.weight * dynamicDripProblem.medicationDosage;
  dynamicDripProblem.supply = generateNumber(tmpSolution, tmpSolution + 500, 50);

  //display problem details
  document.getElementById(
    "dynamic-drip-problem"
  ).innerText = `You have a patient who weighs ${dynamicDripProblem.weight}lbs. You have been ordered to give ${dynamicDripProblem.medicationDosage}mg/kg, the medication comes with ${dynamicDripProblem.supply}mg in a 1,000mL bag of fluid and you want to give the medication over ${dynamicDripProblem.hours} hours.`;

  solveDynamicDrip();
};

function solveDynamicDrip() {
  dynamicDripSolution.kg = dynamicDripProblem.weight / 2.2;
  let tmpSolution = 0;
  tmpSolution = dynamicDripSolution.kg * dynamicDripProblem.medicationDosage; //multiplies the weight by the ordered amount
  let newSupply = dynamicDripProblem.supply / 1000;
  tmpSolution = tmpSolution / newSupply;
  tmpSolution = tmpSolution / dynamicDripProblem.hours; //divides the solution by the number of hours
  tmpSolution = tmpSolution * 60; //multiplies by the drip set
  tmpSolution = tmpSolution / 60; //divides by 60 minutes
  dynamicDripSolution.dripsMin = tmpSolution; //sets the drips a minute

  dynamicDripSolution.medicationGiven = dynamicDripSolution.kg * dynamicDripProblem.medicationDosage; //generate the amount of medication to give
}

function checkDynamicDrip() {
  console.log(dynamicDripSolution);
  let dripsMin = document.getElementById("answer-dynamicDripsMin");
  let weight = document.getElementById("answer-dynamicDripWeight");
  let medGiven = document.getElementById("answer-dynamicDripMed");
  let answerBtn = document.getElementById("check-dynamic-drip-answer");

  answerBtn.classList.remove("incorrect", "correct");

  dripsMin.value === "" ? dripsMin.classList.add("incorrect") : dripsMin.classList.remove("incorrect");
  weight.value === "" ? weight.classList.add("incorrect") : weight.classList.remove("incorrect");
  medGiven.value === "" ? medGiven.classList.add("incorrect") : medGiven.classList.remove("incorrect");
  if (dripsMin.value === "" || weight.value === "" || medGiven.value === "") {
    //make sure no answers are blank
    answerBtn.classList.add("incorrect");
    answerBtn.innerText = "Answer(s) cannot be blank!";
    setTimeout(() => {
      answerBtn.classList.remove("incorrect");
      answerBtn.innerText = "Check Answer";
    }, 2500);
  }

  //check each answer and determine if they are write;
  let answerRange = {
    //determines the range for correct answer
    dripsMin: {
      upper: dynamicDripSolution.dripsMin + 5,
      lower: dynamicDripSolution.dripsMin - 5,
      correct: false,
    },
    kg: {
      upper: dynamicDripSolution.kg + 3,
      lower: dynamicDripSolution.kg - 3,
      correct: false,
    },
    medicationGiven: {
      upper: dynamicDripSolution.medicationGiven + 2,
      lower: dynamicDripSolution.medicationGiven - 2,
      correct: false,
    },
  };
  if (dripsMin.value < answerRange.dripsMin.upper && dripsMin.value > answerRange.dripsMin.lower) {
    //check the drips a minute
    dripsMin.classList.add("correct");
    answerRange.dripsMin.correct = true;
  } else {
    dripsMin.classList.add("incorrect");
  }

  if (weight.value <= answerRange.kg.upper && weight.value >= answerRange.kg.lower) {
    //check kg
    weight.classList.add("correct");
    answerRange.kg.correct = true;
  } else {
    weight.classList.add("incorrect");
  }

  if (medGiven.value <= answerRange.medicationGiven.upper && medGiven.value >= answerRange.medicationGiven.lower) {
    //check amount of medication given
    medGiven.classList.add("correct");
    answerRange.medicationGiven.correct = true;
  } else {
    medGiven.classList.add("incorrect");
  }

  if (answerRange.dripsMin.correct === true && answerRange.kg.correct === true && answerRange.medicationGiven.correct === true) {
    answerBtn.textContent = "Correct";
    answerBtn.classList.add("correct");
  } else {
    answerBtn.textContent = "Incorrect!";
    answerBtn.classList.add("incorrect");
  }
}
