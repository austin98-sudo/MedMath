let mainMenu = document.getElementById("mainMenu");
let dosage = document.getElementById("dosage");
let drip = document.getElementById("static-drip");
let dynamicDrip = document.getElementById("dynamic-drip");
let choose = document.getElementById("choice");
let newProblem = document.getElementById("newProblem");

choose.style.display = "none";
dosage.style.display = "none";
drip.style.display = "none";
dynamicDrip.style.display = "none";

function chooseStaticDrip() {
  newProblem.onclick = chooseStaticDrip;
  choose.style.display = "grid";
  mainMenu.style.display = "none";
  drip.style.display = "grid";
  generateDripProblem();

  //clear answer box
  document.getElementById("answer-dripsMin").classList.remove("incorrect", "correct");
  document.getElementById("answer-dripsMin").value = "";

  //clear answer button
  document.getElementById("answer-check-drip").classList.remove("incorrect", "correct");
  document.getElementById("answer-check-drip").innerText = "Check answer";
}

function chooseDynamicDrip() {
  newProblem.onclick = chooseDynamicDrip;
  choose.style.display = "grid";
  mainMenu.style.display = "none";
  dynamicDrip.style.display = "grid";
  generateDynamicDrip();

  //clear answer boxes
  document.getElementById("answer-dynamicDripWeight").value = "";
  document.getElementById("answer-dynamicDripMed").value = "";
  document.getElementById("answer-dynamicDripsMin").value = "";

  //clear classes
  document.getElementById("answer-dynamicDripWeight").classList.remove("incorrect", "correct");
  document.getElementById("answer-dynamicDripMed").classList.remove("incorrect", "correct");
  document.getElementById("answer-dynamicDripsMin").classList.remove("incorrect", "correct");

  //clear answer button
  document.getElementById("check-dynamic-drip-answer").classList.remove("incorrect", "correct");
  document.getElementById("check-dynamic-drip-answer").textContent = "Check Answer";
}

function chooseDosage() {
  let weight = generateNumber(150, 350, 5);
  newProblem.onclick = chooseDosage;
  choose.style.display = "grid";
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
  document.getElementById("answer-check").classList.remove("incorrect", "correct");
  document.getElementById("answer-check").innerText = "Check answer";
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
  dynamicDrip.style.display = "none";
  mainMenu.style.display = "grid";
  choose.style.display = "none";
}
