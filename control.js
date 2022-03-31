let mainMenu = document.getElementById("mainMenu");
let dosage = document.getElementById("dosage");
let drip = document.getElementById("drip");

dosage.style.display = "none";
drip.style.display = "none";

function chooseDrip() {
  mainMenu.style.display = "none";
  drip.style.display = "grid";
  generateDripProblem();
}

function chooseDosage() {
  let weight = generateWeight();
  mainMenu.style.display = "none";
  dosage.style.display = "grid";
  generateDosageProblem(weight);
  document.getElementById("header").innerText = "Dosage Problem";
  document.getElementById("explain").style.display = "none";
}

function generateWeight() {
  let generatedWeight = Math.floor(Math.random() * (351 - 100 + 1)) + 100;
  generatedWeight = Math.ceil(generatedWeight / 5) * 5;
  return generatedWeight;
}

function generateNumber(min, max, by) {
  let number = Math.floor(Math.random() * (max - min + 1)) + min;
  if (by != null && by != undefined) {
    return Math.ceil(number / by) * by;
  } else {
    return number;
  }
}

function goBack() {
  dosage.style.display = "none";
  drip.style.display = "none";
  mainMenu.style.display = "block";
}
