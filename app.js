"use strict";

const metric = document.getElementById("flexRadioMetric");
const imperial = document.getElementById("flexRadioImperial");
const imperialFields = document.getElementById("imperialChecked");
const metricFields = document.getElementById("metricChecked");
const message = document.getElementById("message");
const messageSuggestion = document.getElementById("message-suggest");
const resultMessage = document.getElementById("message-result");
const heightInputValue = document.getElementById("heightInput");
const weightInputValue = document.getElementById("weightInput");
const heightInputFt = document.getElementById("heightFeetInput");
const heightInputIn = document.getElementById("heightInchesInput");
const weightInputSt = document.getElementById("weightStonesInput");
const weightInputLbs = document.getElementById("weightPoundsInput");
const bmi = document.getElementById("bmi-value");

// Show fields based on selection
function eventHandler() {
  if (imperial.checked == true) {
    imperialFields.style.display = "block";
    metricFields.style.display = "none";
  } else {
    imperialFields.style.display = "none";
    metricFields.style.display = "block";
  }
}

// callback function
eventHandler();

function calculateBMI() {
  // show/hide messages if value is empty or 0
  if (
    (heightInputValue.value == 0 ||
      heightInputValue.value == "" ||
      weightInputValue.value == 0 ||
      weightInputValue.value == "") &&
    (heightInputFt.value == 0 || heightInputFt.value == "") &&
    (heightInputIn.value == 0 || heightInputIn.value == "") &&
    (weightInputSt.value == 0 || weightInputSt.value == "") &&
    (weightInputLbs.value == 0 || weightInputLbs.value == "")
  ) {
    resultMessage.style.display = "none";
    message.style.display = "block";
  } else {
    resultMessage.style.display = "flex";
    message.style.display = "none";
  }

  if (imperial.checked == true) {
    const convertHeightToInches =
      heightInputFt.value * 12 + parseInt(heightInputIn.value);
    const convertWeightToPounds =
      weightInputSt.value * 14 + parseInt(weightInputLbs.value);

    const bmiImperialResult = (
      (703 * convertWeightToPounds) /
      convertHeightToInches ** 2
    ).toFixed(1);

    bmi.innerHTML = bmiImperialResult;
    calculateImperialRange(bmiImperialResult, convertHeightToInches);
  } else {
    const bmiMetricResult = (
      weightInputValue.value /
      (heightInputValue.value / 100) ** 2
    ).toFixed(1);

    bmi.innerHTML = bmiMetricResult;
    calculateMetricRange(bmiMetricResult);
  }
}

function calculateMetricRange(bmi) {
  if (bmi < 18.5) {
    messageSuggestion.innerHTML =
      "Your BMI suggests within the underweight range";
  } else if (bmi > 18.5 && bmi < 24.9) {
    const weightMin = (18.5 * (heightInputValue.value / 100) ** 2).toFixed(1);
    const weightMax = (24.9 * (heightInputValue.value / 100) ** 2).toFixed(1);

    messageSuggestion.innerHTML =
      "Your BMI suggests you're a healthy weight. Your ideal weight is between <strong>" +
      weightMin +
      "kgs </strong> -  <strong>" +
      weightMax +
      " kgs </strong>";
  } else if (bmi > 25 && bmi < 29.9) {
    const weightMin = (25 * (heightInputValue.value / 100) ** 2).toFixed(1);
    const weightMax = (29.9 * (heightInputValue.value / 100) ** 2).toFixed(1);
    messageSuggestion.innerHTML =
      "Your BMI suggests you're within the overweight range  Your ideal weight is between <strong>" +
      weightMin +
      "kgs </strong> -  <strong>" +
      weightMax +
      " kgs </strong>";
  } else {
    messageSuggestion.innerHTML = "Your BMI suggests you’re with obese";
  }
}

function calculateImperialRange(bmi, height) {
  if (bmi < 18.5) {
    messageSuggestion.innerHTML =
      "Your BMI suggests within the underweight range";
  } else if (bmi > 18.5 && bmi < 24.9) {
    const weightMin = ((18.5 * Math.pow(height, 2)) / 703).toFixed(2);

    const weightMax = ((24.9 * Math.pow(height, 2)) / 703).toFixed(2);

    const weightMinInStone = Math.floor(weightMin / 14);
    const weightMaxInStone = Math.floor(weightMax / 14);

    const weightMinInPound = Math.floor(weightMin % 14);
    const weightMaxInPound = Math.floor(weightMax % 14);

    messageSuggestion.innerHTML =
      "Your BMI suggests you're a healthy weight. Your ideal weight is between <strong>" +
      weightMinInStone +
      "st </strong>" +
      "<strong>" +
      weightMinInPound +
      "lbs  </strong>" +
      " - " +
      " <strong>" +
      weightMaxInStone +
      "st </strong>" +
      " <strong>" +
      weightMaxInPound +
      "lbs </strong> ";
  } else if (bmi > 25 && bmi < 29.9) {
    const weightMin = (25 * (heightInputValue.value / 100) ** 2).toFixed(2);
    const weightMax = (29.9 * (heightInputValue.value / 100) ** 2).toFixed(2);
    messageSuggestion.innerHTML =
      "Your BMI suggests you're within the overweight range  Your ideal weight is between <strong>" +
      weightMin +
      "kgs </strong> -  <strong>" +
      weightMax +
      " kgs </strong>";
  } else {
    messageSuggestion.innerHTML = "Your BMI suggests you’re with obese";
  }
}

calculateBMI();
// Capturing Metric input value
document.getElementById("heightInput").addEventListener("input", calculateBMI);
document.getElementById("weightInput").addEventListener("input", calculateBMI);

// Capturing Imperial input value

document
  .getElementById("heightFeetInput")
  .addEventListener("input", calculateBMI);
document
  .getElementById("heightInchesInput")
  .addEventListener("input", calculateBMI);
document
  .getElementById("weightStonesInput")
  .addEventListener("input", calculateBMI);
document
  .getElementById("weightPoundsInput")
  .addEventListener("input", calculateBMI);

//Reset input value and suggest BMI message when user change selection

document.getElementById("flexRadioMetric").addEventListener("change", () => {
  message.style.display = "block";
  resultMessage.style.display = "none";
  document.getElementById("heightInput").value = "";
  document.getElementById("weightInput").value = "";
  document.getElementById("heightFeetInput").value = "";
  document.getElementById("heightInchesInput").value = "";
  document.getElementById("weightStonesInput").value = "";
  document.getElementById("weightPoundsInput").value = "";
});

document.getElementById("flexRadioImperial").addEventListener("change", () => {
  message.style.display = "block";
  resultMessage.style.display = "none";
  document.getElementById("heightInput").value = "";
  document.getElementById("weightInput").value = "";
  document.getElementById("heightFeetInput").value = "";
  document.getElementById("heightInchesInput").value = "";
  document.getElementById("weightStonesInput").value = "";
  document.getElementById("weightPoundsInput").value = "";
});
