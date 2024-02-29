const startButton = document.getElementById('start-button');
const timer = document.getElementById('timer');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const initialsInput = document.getElementById('initials-input');
const saveButton = document.getElementById('save-button');


const questions = [
    { question: 'Question 1', answer: 'A' },
    { question: 'Question 2', answer: 'B' },
    { question: 'Question 3', answer: 'C' }
];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;


const startQuiz = () => {
    timerInterval = setInterval(() => {
        timeLeft--;
        timer.textContent = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
    showQuestion();
};

const showQuestion = () => {
    questionContainer.textContent = questions[currentQuestionIndex].question;
};

const checkAnswer = (answer) => {
    if (answer === questions[currentQuestionIndex].answer) {
        score += 10;
    } else {
        timeLeft -= 10;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
};

const endQuiz = () => {
    clearInterval(timerInterval);
    questionContainer.textContent = 'Game Over';
    resultContainer.textContent = `Your final score is ${score}`;
    initialsInput.style.display = 'block';
    saveButton.style.display = 'block';
};

startButton.addEventListener('click', startQuiz);

saveButton.addEventListener('click', async () => {
    const initials = initialsInput.value;
    await saveInitialsAndScore(initials, score);
});

const saveInitialsAndScore = async (initials, score) => {
    // Implement saving function
};