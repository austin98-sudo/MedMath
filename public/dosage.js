let problem;
let solution;

/**
 * Problem:
 * 
 * Weight in lbs
 * Ordered amount
 * Dosage/Concentration
 */

/**
 * Solution:
 * 
 * Weight in kg
 * Amount of medication
 * Dosage per mL
 */

const orderedAmounts = [0.01, 0.1, 1, 2];
const orderedMcg = [1, 25, 50];

const kgInput = document.getElementById("kg");
const medInput = document.getElementById("med");
const mlInput = document.getElementById("mL");

function generateDosage() {
    kgInput.classList.remove("green", "yellow", "red");
    medInput.classList.remove("green", "yellow", "red");
    mlInput.classList.remove("green", "yellow", "red");

    problem = {
        weight: generateNumber(50, 400),
    }

    //decide if problem will be in mcg or mg
    if (generateNumber(0, 1) === 0) {
        //problem will be mg
        problem.ordered = orderedAmounts[generateNumber(0, orderedAmounts.length-1)];
        problem.dosage = generateNumber(1, 15);
        problem.concentration = generateNumber(1, 25);

        let kg = problem.weight/2.2;

        solution = {
            weight: {
                upper: kg + 2,
                lower: kg - 2,
            },
            medication: {
                upper: (kg * problem.ordered) + 2,
                lower: (kg * problem.ordered) - 2
            },
            concentration: {
                upper: (problem.dosage/problem.concentration) + 0.5,
                lower: (problem.dosage/problem.concentration) - 0.5
            }
        }

        solution.given = { //mL's given to patient
            upper: (kg*problem.ordered)/(problem.dosage/problem.concentration) + 1,
            lower: (kg*problem.ordered)/(problem.dosage/problem.concentration) - 1,
        }
        
        console.log(solution)

        document.getElementById("problemInfo").textContent = `You are ordered to give a ${problem.weight}lb patient ${problem.ordered}mg/kg of a medication. The medication comes stocked in ${problem.dosage}mg/${problem.concentration}mL. Determine the patients weight in kg, how much medication is in 1mL, and how many mL's you will administer to give the appropriate amount of medication.`
    } else {
        //problem will be mcg

        let kg = problem.weight/2.2;

        problem.ordered = orderedMcg[generateNumber(0, orderedMcg.length-1)];
        problem.dosage = generateNumber((problem.ordered*kg > 1000) ? 5 : 1, 10)
        problem.concentration = generateNumber(1, 10);

        solution = {
            weight: { //patients weight in kg
                upper: kg + 2,
                lower: kg - 2
            },
            medication: { //amount of medication given to patient
                upper: (kg * problem.ordered) + 25,
                lower: (kg * problem.ordered) - 25,
            },
            concentration: { //concentration in 1mL
                upper: ((problem.dosage*1000)/problem.concentration) + 0.5,
                lower: ((problem.dosage*1000)/problem.concentration) - 0.5
            }
        }

        solution.given = { //mL's given to patient
            upper: (kg*problem.ordered)/((problem.dosage*1000)/problem.concentration) + 1,
            lower: (kg*problem.ordered)/((problem.dosage*1000)/problem.concentration) - 1,
        }

        console.log(solution);

        document.getElementById("problemInfo").textContent = `You are ordered to give a ${problem.weight}lb patient ${problem.ordered}mcg/kg of a medication. The medication comes stocked in ${problem.dosage}mg/${problem.concentration}mL. Determine the patients weight in kg, how much medication will you give, and how many mL's you will administer to give the appropriate amount of medication.`
    }
}

function checkAnswer() {
    kgInput.classList.remove("green", "yellow", "red");
    medInput.classList.remove("green", "yellow", "red");
    mlInput.classList.remove("green", "yellow", "red");

    let correct = {
        kg: false,
        med: false,
        ml: false,
    }

    if (isNaN(kgInput.value) || kgInput.value === "") { //checks if the weight is correct
        kgInput.classList.add("yellow");
        alert("Weight must be a number and cannot be empty")
    } else if (kgInput.value <= solution.weight.upper && kgInput.value >= solution.weight.lower) {
        kgInput.classList.add("green");
        correct.kg = true;
    } else {
        kgInput.classList.add("red")
    }

    if (isNaN(medInput.value) || medInput.value === "") { //checks if the amount of medication given is correct
        medInput.classList.add("yellow");
        alert("Medication given must be a number and cannot be empty");
    } else if (medInput.value <= solution.medication.upper && medInput.value >= solution.medication.lower) {
        medInput.classList.add("green");
        correct.med = true;
    } else {
        medInput.classList.add("red");
    }

    if (isNaN(mlInput.value) || mlInput.value === "") {
        mlInput.classList.add("yellow");
        alert("mL's must be a number and cannot be empty");
    } else if (mlInput.value <= solution.given.upper && mlInput.value >= solution.given.lower) {
        mlInput.classList.add("green");
        correct.ml = true;
    } else {
        mlInput.classList.add("red");
    }

    if (correct.kg === false || correct.med === false || correct.ml === false) {
        document.getElementById("checkBtn").textContent = "Incorrect - Try again"
        setTimeout(() => {
            document.getElementById("checkBtn").textContent = "Check Answer"
        }, 1500);
    }

}

function generateNumber(min, max, by = null) {
    let number = Math.floor(Math.random() * (max - min + 1)) + min;
    if (by != null) {
      return Math.round(number / by) * by;
    } else {
      return number;
    }
  }
  
generateDosage();