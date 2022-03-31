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
  problem.ordered.unit = units[generateNumber(0, 1)];
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
      problem.concentration.amount = generateNumber(
        (problem.ordered.amount * problem.weight) / 1000,
        (problem.ordered.amount * problem.weight) / 1000 + 10,
        5
      );
      problem.concentration.amount = Math.ceil(problem.concentration.amount);
    }
  } else {
    if (problem.randomType === "weight") {
      let tempkg = problem.weight / 2.2;
      problem.concentration.amount = generateNumber(
        problem.ordered.amount * tempkg,
        problem.ordered.amount * tempkg + 10
      );
      problem.concentration.amount = Math.ceil(problem.concentration.amount);
    } else {
      problem.concentration.amount = generateNumber(
        problem.ordered.amount,
        problem.ordered.amount + 100
      );
    }
    problem.concentration.housing = generateNumber(1, 25);
  }

  document.getElementById("weight").innerText = `Weight: ${problem.weight} lbs`;
  document.getElementById(
    "concentration"
  ).innerText = `Concentration: ${problem.concentration.amount}${problem.concentration.unit} / ${problem.concentration.housing}mL`;
  if (problem.randomType === "weight") {
    document.getElementById(
      "ordered"
    ).innerText = `Ordered: ${problem.ordered.amount}${problem.ordered.unit}/kg`;
  } else {
    document.getElementById(
      "ordered"
    ).innerText = `Ordered: ${problem.ordered.amount}${problem.ordered.unit}`;
  }
  generateSolutions();
}

function generateSolutions() {
  let kg = Math.round(problem.weight / 2.2, 0); // calculate lbs to kg
  solution.weight.upper = kg + 3;
  solution.weight.lower = kg - 3;

  if (problem.ordered.unit === "mcg") {
    //simplify concentration
    let tempconcentration =
      (problem.concentration.amount / problem.concentration.housing) * 1000;
    //determine amount to give
    if (problem.randomType === "weight") {
      let tempgiven = (problem.ordered.amount * kg) / tempconcentration;
      solution.amountGiven.upper = tempgiven + 0.25;
      solution.amountGiven.lower = tempgiven - 0.25;
    } else {
      let tempgiven = problem.ordered.amount / tempconcentration;
      solution.amountGiven.upper = tempgiven + 0.25;
      solution.amountGiven.lower = tempgiven - 0.25;
    }
  } else {
    if (problem.randomType === "weight") {
      let tempconcentration =
        problem.concentration.amount / problem.concentration.housing;
      let tempgiven = (problem.ordered.amount * kg) / tempconcentration;
      solution.amountGiven.upper = tempgiven + 0.25;
      solution.amountGiven.lower = tempgiven - 0.25;
    } else {
      let tempconcentration =
        problem.concentration.amount / problem.concentration.housing;
      let tempgiven = problem.ordered.amount / tempconcentration;
      solution.amountGiven.upper = tempgiven + 0.25;
      solution.amountGiven.lower = tempgiven - 0.25;
    }
  }
  //sets lower limit to zero if it is a negative number
  solution.amountGiven.lower =
    solution.amountGiven.lower < 0 ? 0 : solution.amountGiven.lower;

  //round numbers
  solution.amountGiven.upper =
    Math.round(solution.amountGiven.upper * 1000) / 1000;
  solution.amountGiven.lower =
    Math.round(solution.amountGiven.lower * 1000) / 1000;
}

function checkAnswer() {
  let kgAnswer = document.getElementById("answer-kg");
  let givenAnswer = document.getElementById("answer-given");

  kgAnswer.className = "";
  givenAnswer.className = "";

  let answers = {
    kg: false,
    given: false,
  };

  if (kgAnswer.value === "") {
    kgAnswer.className = "error";
  } else {
    //check kg answer
    if (solution.weight.lower < kgAnswer && kgAnswer < solution.weight.upper) {
      answers.kg = true;
    }
  }

  if (givenAnswer.value === "") {
    givenAnswer.className = "error";
  } else {
    if (
      solution.amountGiven.lower < givenAnswer &&
      givenAnswer < solution.weight.upper
    ) {
      answers.given = true;
    }
  }
  let answerBtn = document.getElementById("answer-check");
  if (answers.given === true && answers.kg === true) {
    answerBtn.innerText = "Correct!";
    answerBtn.className = "correct";
  } else if (kgAnswer.value === "" || givenAnswer.value === "") {
    answerBtn.innerText = "Answer(s) blank";
    answerBtn.className = "incorrect";
  } else {
    answerBtn.innerText = "Incorrect";
    answerBtn.className = "incorrect";
  }
}
