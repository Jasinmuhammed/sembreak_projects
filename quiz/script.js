const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answer-container");

const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");

const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");

const resultMessage = document.getElementById("result-message");

const progressBar = document.getElementById("progress");


// Quiz Questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },

  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },

  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },

  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },

  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];


// Variables
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;


// Initial Values
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;


// Event Listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);


// Start Quiz
function startQuiz() {

  currentQuestionIndex = 0;
  score = 0;

  scoreSpan.textContent = score;

  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");

  quizScreen.classList.add("active");

  showQuestion();
}


// Show Question
function showQuestion() {

  answerDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent =
    (currentQuestionIndex / quizQuestions.length) * 100;

  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach(answer => {

    const button = document.createElement("button");

    button.textContent = answer.text;

    button.classList.add("answer-btn");

    if (answer.correct) {
      button.dataset.correct = "true";
    }

    button.addEventListener("click", () => {
      handleAnswerClick(button, answer);
    });

    answersContainer.appendChild(button);
  });
}


// Handle Answer Click
function handleAnswerClick(button, answer) {

  if (answerDisabled) return;

  answerDisabled = true;

  if (answer.correct) {

    button.classList.add("correct");

    score++;

    scoreSpan.textContent = score;

  } else {

    button.classList.add("incorrect");
  }

  // Show Correct Answer
  Array.from(answersContainer.children).forEach(btn => {

    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }

    btn.disabled = true;
  });

  // Next Question
  setTimeout(() => {

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {

      showQuestion();

    } else {

      showResults();
    }

  }, 1000);
}


// Show Results
function showResults() {

  quizScreen.classList.remove("active");

  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  progressBar.style.width = "100%";

  if (score === quizQuestions.length) {

    resultMessage.textContent = "Perfect Score!";

  } else if (score >= 3) {

    resultMessage.textContent = "Good Job!";

  } else {

    resultMessage.textContent = "Try Again!";
  }
}


// Restart Quiz
function restartQuiz() {

  resultScreen.classList.remove("active");

  startScreen.classList.add("active");
}