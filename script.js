const questions = [
  {
    question: "What is the time complexity of binary search?",
    choices: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correctIndex: 1,
  },
  {
    question: "What is the space complexity of merge sort?",
    choices: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correctIndex: 0,
  },
  {
    question: "What is the average case time complexity of quicksort?",
    choices: ["O(n)", "O(log n)", "O(n log n)", "O(n^2)"],
    correctIndex: 2,
  },
  {
    question:
      "What is the space complexity of an iterative algorithm that only uses a constant amount of extra space?",
    choices: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correctIndex: 3,
  },
];

let currQuesInd = 0;
let choiceSelected = false;
let score = 0;
let quenum = 0;
let length = questions.length;

function randomQue() {
  let randInd = Math.floor(Math.random() * questions.length);
  currQuesInd = randInd;
}

window.onload = function () {
  randomQue();
  displayQues();
  updateHUD();
};

function displayQues() {
  choiceSelected = false;
  let ques = questions[currQuesInd];
  let quesElem = document.getElementById("question");
  quesElem.innerText = ques.question;
  for (let i = 0; i < ques.choices.length; i++) {
    let choice = ques.choices[i];
    let choiceElem = document.getElementById("c" + i);
    choiceElem.innerText = choice;
    choiceElem.parentNode.style.backgroundColor = "";
  }
  quenum++;
  updateHUD();
}

function updateHUD() {
  document.getElementById(
    "question-number"
  ).innerText = `Question: ${quenum} / ${length}`;
  document.getElementById("scoreCount").innerText = `${score}`;
  let progress = (quenum / length) * 100;
  document.getElementById("progressBarFull").style.width = `${progress}%`;
}

function removeQuestion() {
  questions.splice(currQuesInd, 1);
}

for (let i = 0; i < 4; i++) {
  document
    .getElementById("c" + i)
    .parentNode.addEventListener("click", function () {
      if (!choiceSelected) {
        choiceSelected = true;
        let isCorrect = questions[currQuesInd].correctIndex === i;
        let ele = document.getElementById("c" + i).parentNode;
        ele.style.backgroundColor = isCorrect ? "green" : "red";

        if (isCorrect) {
          score = score + 10;
        } else {
          let correctChoice = document.getElementById(
            "c" + questions[currQuesInd].correctIndex
          ).parentNode;
          correctChoice.style.backgroundColor = "green";
        }

        setTimeout(() => {
          removeQuestion();
          if (questions.length > 0) {
            randomQue();
            displayQues();
          } else {
            displayEndScreen();
          }
        }, 2000);
      }
    });
}

function displayEndScreen() {
  document.getElementById("question").style.display = "none";
  document.querySelector(".choices").style.display = "none";
  document.getElementById("hud").style.display = "none";
  document.getElementById("end-screen").style.display = "block";
  document.getElementById("final-score").innerText = `Your score: ${score}`;
}

document
  .getElementById("restart-button")
  .addEventListener("click", function () {
    location.reload();
  });

document.getElementById("home-button").addEventListener("click", function () {
  window.location.href = "index.html";
});
