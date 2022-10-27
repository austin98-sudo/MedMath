let problem = {
  ordered: {
    amount: 0,
    unit: "",
  },
  randomType: "",
  weight: 0,
  concentration: {
    amount: 0,
    housing: 0,
    unit: "",
  },
};

let solution = {
  weight: {
    upper: 0,
    lower: 0,
  },
  amountGiven: {
    upper: 0,
    lower: 0,
  },
};

function generateDosageProblem(transferweight) {
  problem.weight = transferweight; //loads weight
  let units = ["mg", "mcg"];

  //generate type
  let type = ["weight", "constant"];

  problem.randomType = type[generateNumber(0, 1)];

  //determine if weight based or certain amount

  //generate ordered
  problem.ordered.unit = units[generateNumber(0, 1)]; //chooses the unit

  if (problem.ordered.unit == "mcg") {
    problem.ordered.amount = generateNumber(50, 150, 5);
  } else {
    if (problem.randomType === "weight") {
      problem.ordered.amount = generateNumber(0.01, 1);
    } else {
      problem.ordered.amount = generateNumber(1, 250, 5);
    }
  }

  //generate concentrations

  problem.concentration.unit = "mg";

  if (problem.ordered.unit == "mcg") {
    problem.concentration.amount = generateNumber(1, 10);
    problem.concentration.housing = generateNumber(1, 5);
    if (problem.randomType === "weight") {
      problem.concentration.amount = generateNumber((problem.ordered.amount * problem.weight) / 1000, (problem.ordered.amount * problem.weight) / 1000 + 10, 5);
      problem.concentration.amount = Math.ceil(problem.concentration.amount);
    }
  } else {
    if (problem.randomType === "weight") {
      let tempkg = problem.weight / 2.2;
      problem.concentration.amount = generateNumber(problem.ordered.amount * tempkg, problem.ordered.amount * tempkg + 10);
      problem.concentration.amount = Math.ceil(problem.concentration.amount);
    } else {
      problem.concentration.amount = generateNumber(problem.ordered.amount, problem.ordered.amount + 100);
    }
    problem.concentration.housing = generateNumber(1, 25);
  }

  document.getElementById("dosage-problem").textContent = `You have a ${problem.weight}lb patient. You have been ordered to give ${problem.ordered.amount}${problem.ordered.unit}${problem.randomType === "weight" ? "/kg" : ""}. The vial you have is ${
    problem.concentration.amount
  }${problem.concentration.unit}/${problem.concentration.housing}mL`;
  generateSolutions();
}

function generateSolutions() {
  let kg = Math.round(problem.weight / 2.2, 0); // calculate lbs to kg
  solution.weight.upper = kg + 3;
  solution.weight.lower = kg - 3;

  if (problem.ordered.unit === "mcg") {
    //simplify concentration
    let tempconcentration = (problem.concentration.amount / problem.concentration.housing) * 1000;
    //determine amount to give
    if (problem.randomType === "weight") {
      let tempgiven = (problem.ordered.amount * kg) / tempconcentration;
      solution.amountGiven.upper = tempgiven + 0.5;
      solution.amountGiven.lower = tempgiven - 0.5;
    } else {
      let tempgiven = problem.ordered.amount / tempconcentration;
      solution.amountGiven.upper = tempgiven + 0.5;
      solution.amountGiven.lower = tempgiven - 0.5;
    }
  } else {
    if (problem.randomType === "weight") {
      let tempconcentration = problem.concentration.amount / problem.concentration.housing;
      let tempgiven = (problem.ordered.amount * kg) / tempconcentration;
      solution.amountGiven.upper = tempgiven + 0.5;
      solution.amountGiven.lower = tempgiven - 0.5;
    } else {
      let tempconcentration = problem.concentration.amount / problem.concentration.housing;
      let tempgiven = problem.ordered.amount / tempconcentration;
      solution.amountGiven.upper = tempgiven + 0.5;
      solution.amountGiven.lower = tempgiven - 0.5;
    }
  }
  //sets lower limit to zero if it is a negative number
  solution.amountGiven.lower = solution.amountGiven.lower < 0 ? 0 : solution.amountGiven.lower;

  //round numbers
  solution.amountGiven.upper = Math.round(solution.amountGiven.upper * 1000) / 1000;
  solution.amountGiven.lower = Math.round(solution.amountGiven.lower * 1000) / 1000;
  if (solution.amountGiven.lower < 0.01) {
    chooseDosage();
  }
}

function checkAnswer() {
  let kgAnswer = document.getElementById("answer-kg");
  let givenAnswer = document.getElementById("answer-given");

  let answers = {
    kg: false,
    given: false,
  };

  if (kgAnswer.value === "") {
    kgAnswer.classList.add("incorrect");
  } else {
    //check kg answer
    if (solution.weight.lower <= kgAnswer.value && kgAnswer.value <= solution.weight.upper) {
      answers.kg = true;
      kgAnswer.classList.remove("incorrect");
      kgAnswer.classList.add("correct");
    } else {
      kgAnswer.classList.add("incorrect");
    }
  }

  if (givenAnswer.value === "") {
    givenAnswer.classList.add("incorrect");
  } else {
    givenAnswer.classList.remove("incorrect", "correct");
    if (solution.amountGiven.lower <= givenAnswer.value && givenAnswer.value <= solution.amountGiven.upper) {
      answers.given = true;
      givenAnswer.classList.add("correct");
    } else {
      givenAnswer.classList.add("incorrect");
    }
  }
  let answerBtn = document.getElementById("answer-check");
  answerBtn.classList.remove("incorrect", "correct");
  if (answers.given === true && answers.kg === true) {
    answerBtn.innerText = "Correct!";
    answerBtn.classList.add("correct");
  } else if (kgAnswer.value === "" || givenAnswer.value === "") {
    answerBtn.innerText = "Answer(s) blank";
    answerBtn.classList.add("incorrect");
    setTimeout(() => {
      answerBtn.classList.remove("incorrect");
      answerBtn.innerText = "Check Answer";
    }, 2500);
  } else {
    answerBtn.innerText = "Incorrect";
    answerBtn.classList.add("incorrect");
    if (answers.given === false || answers.kg === false) {
      givenAnswer.classList.add("incorrect");
      givenAnswer.innerText = "Incorrect!";
    }
    setTimeout(() => {
      answerBtn.classList.remove("incorrect");
      answerBtn.innerText = "Check Answer";
    }, 2500);
  }
}
