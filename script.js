"use strict";

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("nextBtn");

const resultBox = document.getElementById("result");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

const quizBox = document.getElementById("quiz");

let questions = [
  {
    question: "What does DOM stand for?",
    answers: [
      "Document Object Model",
      "Data Object Model",
      "Display Object Model",
      "Digital Object Model",
    ],
    correct: 0,
  },
  {
    question: "Which keyword declares a variable?",
    answers: ["var", "let", "const", "All of the above"],
    correct: 3,
  },
  {
    question: "Which method converts JSON to object?",
    answers: [
      "JSON.stringify()",
      "JSON.parse()",
      "JSON.convert()",
      "JSON.object()",
    ],
    correct: 1,
  },
  {
    question: "Which array method loops through items?",
    answers: ["map()", "forEach()", "filter()", "reduce()"],
    correct: 1,
  },
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

startQuiz();

function startQuiz() {
  showQuestion();
  startTimer();
}

function showQuestion() {
  const q = questions[currentQuestion];

  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const li = document.createElement("li");
    li.textContent = answer;

    li.addEventListener("click", () => selectAnswer(index));

    answersEl.appendChild(li);
  });
}

function selectAnswer(index) {
  const correctIndex = questions[currentQuestion].correct;

  if (index === correctIndex) {
    score++;
    scoreEl.textContent = `Score: ${score}`;
  }

  nextQuestion();
}

function nextQuestion() {
  clearInterval(timer);

  currentQuestion++;

  if (currentQuestion >= questions.length) {
    showResult();
  } else {
    timeLeft = 15;
    showQuestion();
    startTimer();
  }
}

nextBtn.addEventListener("click", nextQuestion);

function startTimer() {
  timerEl.textContent = `Time: ${timeLeft}`;

  timer = setInterval(() => {
    timeLeft--;

    timerEl.textContent = `Time: ${timeLeft}`;

    if (timeLeft === 0) {
      nextQuestion();
    }
  }, 1000);
}

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");

  finalScore.textContent = `${score} / ${questions.length}`;
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  timeLeft = 15;

  scoreEl.textContent = "Score: 0";

  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");

  startQuiz();
});
