let dripProblem = {
  ordered: {
    amount: 0,
    hours: 0,
  },
  dripSet: 0,
};

let dripsMin = 0;

let dripOrder = document.getElementById("drip-ordered");
let dripHours = document.getElementById("drip-hours");
let dripSet = document.getElementById("drip-set");

function generateDripProblem() {
  //generates a static drip problem
  dripProblem.ordered.hours = generateNumber(12, 48); //generate number of hours

  let dripSetArr = [15, 60];
  dripProblem.dripSet = dripSetArr[generateNumber(0, 1)]; //determine drip set

  dripProblem.ordered.amount = generateNumber(1500, 4000, 50); //generate amount needed

  dripHours.innerText = `Duration: ${dripProblem.ordered.hours} hours`;
  dripOrder.innerText = `Ordered: ${dripProblem.ordered.amount}mL`;
  dripSet.innerText = `Drip set: ${dripProblem.dripSet}gtt`;

  dripsMin = (dripProblem.ordered.amount / dripProblem.ordered.hours / 60) * dripProblem.dripSet;
}

function checkDripAnswer() {
  let dripAnswer = document.getElementById("answer-dripsMin");
  let dripAnswerBtn = document.getElementById("answer-check-drip");

  dripAnswer.className = "";

  if (dripAnswer.value === "") {
    //check if answer is blank
    dripAnswer.className = "incorrect";
    dripAnswerBtn.innerText = "Answer blank";
    dripAnswerBtn.className = "incorrect";
    setTimeout(() => {
      dripAnswerBtn.className = "";
      dripAnswerBtn.innerText = "Check Answer";
    }, 2500);
  } else {
    if (dripAnswer.value < dripsMin + 5 && dripAnswer.value > dripsMin - 5) {
      //answer is correct
      dripAnswer.className = "correct";
      dripAnswerBtn.innerText = "Correct!";
      dripAnswerBtn.className = "correct";
    } else {
      //answer is incorrect
      dripAnswerBtn.innerText = "Incorrect";
      dripAnswerBtn.className = "incorrect";
      dripAnswer.className = "incorrect";
      setTimeout(() => {
        dripAnswerBtn.className = "";
        dripAnswerBtn.innerText = "Check Answer";
      }, 2500);
    }
  }
}
