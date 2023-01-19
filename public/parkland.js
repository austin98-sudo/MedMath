const problemInfo = document.getElementById("problemInfo");
const kgInput = document.getElementById("kg");
const firstmL = document.getElementById("firstmL");
const dripmL = document.getElementById("dripmL");

var problem = {};
var solution = {};

function generateParkland() {
  //reset values
  document.getElementById("medNotes").value = "";
  kgInput.value = "";
  firstmL.value = "";
  dripmL.value = "";

  //remove classes
  kgInput.classList.remove("green", "yellow", "red");
  firstmL.classList.remove("green", "yellow", "red");
  dripmL.classList.remove("green", "yellow", "red");

  problem = {
    weight: generateNumber(20, 350, 5),
    bsa: generateNumber(9, 100, 9),
  };

  solution = {
    weight: {
      //prettier-ignore
      upper: (problem.weight / 2.2) + 2,
      //prettier-ignore
      lower: (problem.weight / 2.2) - 2,
    },
    totalVolume: {
      //prettier-ignore
      "2mL": ((problem.weight / 2.2) * problem.bsa) * 2,
      //prettier-ignore
      "4mL": ((problem.weight / 2.2) * problem.bsa) * 4,
    },
    firstGiven: {
      "2mL": null,
      "4mL": null,
    },
    drip: {
      "2mL": null,
      "4mL": null,
    },
  };

  //Calculate mL's given in the first 8 hours
  //prettier-ignore
  solution.firstGiven["2mL"] = ((solution.totalVolume["2mL"]/2));
  //prettier-ignore
  solution.firstGiven["4mL"] = ((solution.totalVolume["4mL"]/2));

  //Calculate the drips per minute
  //prettier-ignore
  solution.drip["2mL"] = (((solution.firstGiven["2mL"]/8)/60)*15)-5;
  //prettier-ignore
  solution.drip["4mL"] = (((solution.firstGiven["4mL"]/8)/60)*15)+5;

  //Display the problem info
  problemInfo.textContent = `You have a patient who weighs ${problem.weight} lbs. They are burned on ${problem.bsa}% of their body. Please determine how many mL's you will give them over the next 8 hours. You will also need to determine how many drips per minute you will need to give to meet this required amount, you will be using a 15gtt drip set.`;
}

function checkAnswer() {
  kgInput.classList.remove("yellow", "red", "green");
  firstmL.classList.remove("yellow", "red", "green");
  dripmL.classList.remove("yellow", "red", "green");

  let kgInputBlank = false;
  //check the weight
  if (isNaN(kgInput.value) || kgInput.value === "") {
    //confirm value is a number
    kgInput.classList.add("yellow");
    kgInputBlank = true;
    alert("kg's must be a number and cannot be blank");
  }

  if (kgInput.value < solution.weight.upper && kgInput.value > solution.weight.lower) {
    //checks to see if kg answer is correct
    kgInput.classList.add("green");
  } else if (kgInputBlank === false) {
    kgInput.classList.add("red");
  }

  let firstmLBlank = false;
  //check the first 8 hours
  if (isNaN(firstmL.value) || firstmL.value === "") {
    //confirm value is a number
    firstmL.classList.add("yellow");
    firstmLBlank = true;
    alert("First 8 hour mL's must be a number and cannot be blank");
  }

  console.log(solution.firstGiven["4mL"],solution.firstGiven["2mL"]);
  let mLRange = {
    upper: solution.firstGiven["4mL"] + 50,
    lower: solution.firstGiven["2mL"] - 50,
  };

  if (mLRange.upper > firstmL.value && firstmL.value > mLRange.lower) {
    firstmL.classList.add("green");
  } else if (firstmLBlank === false) {
    firstmL.classList.add("red");
  }

  let dripBlank = false;
  //check the drips a minute
  if (isNaN(dripmL.value) || dripmL.value === "") {
    //confirm value is a number
    dripmL.classList.add("yellow");
    dripBlank = true;
    alert("Drips must be a number and cannot be blank");
  }

  if (solution.drip["4mL"] > dripmL.value && solution.drip["2mL"] < dripmL.value) {
    dripmL.classList.add("green");
  } else if (dripBlank === false) {
    dripmL.classList.add("red");
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

generateParkland();
