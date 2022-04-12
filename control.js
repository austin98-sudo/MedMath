let mainMenu = document.getElementById("mainMenu");
let dosage = document.getElementById("dosage");
let drip = document.getElementById("drip");

alert("The location for this website has been changed to medmathpractice.web.app this is to allow easier access. This location for the website will be avaliable until May 31st 2022");

dosage.style.display = "none";
drip.style.display = "none";

function chooseDrip() {
  mainMenu.style.display = "none";
  drip.style.display = "grid";
  generateDripProblem();

  //clear answer box
  document.getElementById("answer-dripsMin").className = "";
  document.getElementById("answer-dripsMin").value = "";

  //clear answer button
  document.getElementById("answer-check-drip").className = "";
  document.getElementById("answer-check-drip").innerText = "Check answer";
}

function chooseDosage() {
  let weight = generateWeight();
  mainMenu.style.display = "none";
  dosage.style.display = "grid";
  generateDosageProblem(weight);
  document.getElementById("header").innerText = "Dosage Problem";

  //clear answer box
  document.getElementById("answer-kg").className = "";
  document.getElementById("answer-kg").value = "";

  //clear answer box
  document.getElementById("answer-given").className = "";
  document.getElementById("answer-given").value = "";

  //clear answer button
  document.getElementById("answer-check").className = "";
  document.getElementById("answer-check").innerText = "Check answer";
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
