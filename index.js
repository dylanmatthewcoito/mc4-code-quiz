const questions = [
    {
        question: "Question 1: Commonly used datatypes DO NOT include:",
        answers: [
            "strings",
            "booleans",
            "alerts",
            "numbers"
        ],
        correctAnswer: "alerts"
    },
    {
        question: "Question 2: The condition in an if / else staement is enclosed with _____.",
        answers: [
            "quotes",
            "curley brackets",
            "parenthesis",
            "square brackets"
        ],
        correctAnswer: "parenthesis"
    },
    {
        question: "Question 3: Arrays in Javascript can be used to store _____.",
        answers: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above"
        ],
        correctAnswer: "all of the above"
    },
    {
        question: "Question 4: String values must be enclosed within _____ when being assigned to variables.",
        answers: [
            "commas",
            "curley brackets",
            "quotes",
            "parenthesis"
        ],
        correctAnswer: "quotes"
    },
    {
        question: "Question 5: A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            "Javascript",
            "terminal/bash",
            "for loops",
            "console.log"
        ],
        correctAnswer: "console.log"
    }
];

const startBtn = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const timerElement = document.getElementById('timer');

let currentQuestionIndex = 0;
let timeLeft = 60;

startBtn.addEventListener('click', startQuiz);

function startQuiz() {
    startBtn.style.display = 'none';
    displayQuestion(currentQuestionIndex);

    const timerInterval = setInterval(function () {
        timerElement.textContent = `Time: ${timeLeft}`;
        timeLeft--;

        if (timeLeft < 0 || currentQuestionIndex >= questions.length) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function displayQuestion(index) {
    if (index >= questions.length) {
        return;
    }

    const question = questions[index];
    const answersHtml = question.answers.map((answer, i) => `
      <button onclick="checkAnswer(${index}, ${i})">${answer}</button>
    `).join('');

    questionContainer.innerHTML = `
      <h2>${question.question}</h2>
      <div>${answersHtml}</div>
    `;
}

function checkAnswer(questionIndex, answerIndex) {
    const selectedAnswer = questions[questionIndex].answers[answerIndex];
    const correctAnswer = questions[questionIndex].correctAnswer;

    if (selectedAnswer === correctAnswer) {
        
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    } else {
        timeLeft -= 10;
    }
}

function endQuiz() {
    questionContainer.innerHTML = '<h2>Quiz Over!</h2>';
    
    const initials = prompt('Enter your initials for saving score:');
    const scoreData = {
      initials: initials,
      score: timeLeft
    };
    localStorage.setItem('quizScore', JSON.stringify(scoreData));
    
    // displayLeaderboard(); implement leaderbord  view
    
    questionContainer.innerHTML += `
      <button onclick="restartQuiz()">Restart Quiz</button>
    `;
  }
  
  function restartQuiz() {
    localStorage.removeItem('quizScore'); 
    location.reload(); 
  }