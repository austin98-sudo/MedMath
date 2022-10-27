let problem;
let solution;

/**
 * Problem:
 *
 * Weight
 * Ordered dosage
 * Amount of mL
 * Hours
 */

/**
 * Solution:
 *
 * Weight in kg
 * Amount of medication given
 * Drips per minute
 */

const possibleDosage = [0.01, 0.1, 0.5, 1, 2];

function generateComplexDrip() {
  problem = {
    weight: generateNumber(50, 600, 5),
    dosage: possibleDosage[generateNumber(0, possibleDosage.length - 1)],
    saline: generateNumber(500, 5000, 250),
    hours: generateNumber(2, 48, 1),
  };

  solution = {
    weight: {
      //prettier-ignore
      upper: (problem.weight/2.2)+3,
      //prettier-ignore
      lower: (problem.weight/2.2)-3,
    },
    medication: {
      //prettier-ignore
      upper: ((problem.weight/2.2)*problem.dosage)+2.5,
      //prettier-ignore
      lower: ((problem.weight/2.2)*problem.dosage)-2.5,
    },
    //prettier-ignore
    drips: {
        upper: ((problem.saline/problem.hours))+5,
        lower: ((problem.saline/problem.hours))-5
    },
  };

  document.getElementById(
    "problemInfo"
  ).textContent = `You are ordered to give a ${problem.weight} lb patient ${problem.dosage} mg/kg of a medication. Once you have drawn the medication up you will inject it into a ${problem.saline} mL bag of saline and give it over ${problem.hours} hours. Determine what the patients weight is in kg, the amount of medicaiton you will give, and the appropriate number of drips per minute.`;
}

function generateNumber(min, max, by = null) {
  let number = Math.floor(Math.random() * (max - min + 1)) + min;
  if (by != null && by != undefined) {
    return Math.round(number / by) * by;
  } else {
    return number;
  }
}
