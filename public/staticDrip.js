let dripProblem = {
  ordered: {
    amount: 0,
    hours: 0,
  },
  dripSet: 0,
};

let dripsMin = 0;

function generateDripProblem() {
  //generates a static drip problem
  dripProblem.ordered.hours = generateNumber(6, 24); //generate number of hours

  let dripSetArr = [15, 60];
  dripProblem.dripSet = dripSetArr[generateNumber(0, 1)]; //determine drip set

  dripProblem.ordered.amount = generateNumber(1500, 4000, 50); //generate amount needed

  document.getElementById(
    "static-drip-problem"
  ).textContent = `You have been ordered to give ${dripProblem.ordered.amount}mL's over ${dripProblem.ordered.hours} hours. You have a ${dripProblem.dripSet}gtt drip set. How many drips a minute do you want?`;

  dripsMin = (dripProblem.ordered.amount / dripProblem.ordered.hours / 60) * dripProblem.dripSet;
}

function checkDripAnswer() {
  let dripAnswer = document.getElementById("answer-dripsMin");
  let dripAnswerBtn = document.getElementById("answer-check-drip");
  dripAnswerBtn.classList.remove("incorrect", "correct");
  dripAnswer.classList.remove("incorrect", "correct");

  if (dripAnswer.value === "") {
    //check if answer is blank
    dripAnswer.classList.add("incorrect");
    dripAnswerBtn.innerText = "Answer(s) blank";
    dripAnswerBtn.classList.add("incorrect");
    setTimeout(() => {
      dripAnswerBtn.classList.remove("incorrect");
      dripAnswerBtn.innerText = "Check Answer";
    }, 2500);
  } else {
    if (dripAnswer.value < dripsMin + 5 && dripAnswer.value > dripsMin - 5) {
      //answer is correct
      dripAnswer.classList.add("correct");
      dripAnswerBtn.classList.add("correct");
      dripAnswerBtn.innerText = "Correct!";
    } else {
      //answer is incorrect
      dripAnswerBtn.classList.add("incorrect");
      dripAnswer.classList.add("incorrect");
      dripAnswerBtn.innerText = "Incorrect!";

      setTimeout(() => {
        dripAnswerBtn.classList.remove("incorrect");
        dripAnswerBtn.innerText = "Check Answer";
      }, 2500);
    }
  }
}
