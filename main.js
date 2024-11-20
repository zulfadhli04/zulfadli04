let quizdata = [
    {
        question: "What event is widely considered the starting point of World War II?",
        options: [
            "A. The signing of the Treaty of Versailles",
            "B. The German invasion of Poland",
            "C. The bombing of Pearl Harbor",
            "D. The rise of Adolf Hitler to power"
        ],
        correct: "B. The German invasion of Poland"
    },
    {
        question: "Which year did World War II begin?",
        options: ["A. 1935", "B. 1939", "C. 1941", "D. 1945"],
        correct: "B. 1939"
    },
    {
        question: "Who was the Prime Minister of the UK during most of World War II?",
        options: ["A. Neville Chamberlain", "B. Winston Churchill", "C. Clement Attlee", "D. Anthony Eden"],
        correct: "B. Winston Churchill"
    },
    {
        question: "What was the main reason for the United States entering World War II?",
        options: [
            "A. German invasion of France",
            "B. Japanese attack on Pearl Harbor",
            "C. Italian alliance with Germany",
            "D. Soviet Union's invasion of Poland"
        ],
        correct: "B. Japanese attack on Pearl Harbor"
    },
    {
        question: "What was the code name for the Allied invasion of Normandy?",
        options: [
            "A. Operation Torch",
            "B. Operation Overlord",
            "C. Operation Barbarossa",
            "D. Operation Market Garden"
        ],
        correct: "B. Operation Overlord"
    }
];

const quizContainer = document.querySelector(".quiz-container");
const questionEl = document.querySelector(".question");
const optionsEl = document.querySelector(".options");
const nextBtn = document.querySelector(".next-btn");
const quizResult = document.querySelector(".quiz-result");
const scoreEl = document.querySelector("#score");
const userDetails = document.querySelector(".user-details");
const questionsAnsweredEl = document.querySelector(".questions-answered");

let currentQuestionIndex = 0;
let score = 0;
let answeredQuestions = [];
let userName = "";
let userAge = "";
let userAnswers = [];

// Load the question
const loadQuestion = () => {
    optionsEl.innerHTML = "";
    questionEl.textContent = quizdata[currentQuestionIndex].question;

    quizdata[currentQuestionIndex].options.forEach((optionText) => {
        const option = document.createElement("button");
        option.textContent = optionText;
        option.classList.add("option");
        option.addEventListener("click", () => checkAnswer(option, optionText));
        optionsEl.appendChild(option);
    });
};

// Check if the selected answer is correct
const checkAnswer = (selectedOption, selectedAnswer) => {
    const allOptions = document.querySelectorAll(".option");
    allOptions.forEach((option) => (option.disabled = true));

    userAnswers[currentQuestionIndex] = selectedAnswer;

    if (selectedAnswer === quizdata[currentQuestionIndex].correct) {
        selectedOption.classList.add("correct");
        score++;
    } else {
        selectedOption.classList.add("incorrect");
    }
};

// Next question button functionality
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizdata.length) {
        loadQuestion();
    } else {
        displayResult();
    }
});

// Display the results
const displayResult = () => {
    quizContainer.style.display = "none";
    quizResult.style.display = "block";
    document.getElementById("user-name").textContent = userName;
    document.getElementById("user-age").textContent = userAge;
    scoreEl.textContent = `You scored ${score} out of ${quizdata.length}`;
    questionsAnsweredEl.innerHTML = `Questions answered: ${answeredQuestions.length}`;

    let answersSummary = "";
    quizdata.forEach((question, index) => {
        answersSummary += `
            <div class="question-summary">
                <h3>${question.question}</h3>
                <p>Your answer: <span class="${userAnswers[index] === question.correct ? 'correct' : 'incorrect'}">${userAnswers[index]}</span></p>
                <p>Correct answer: <span class="correct">${question.correct}</span></p>
            </div>
        `;
    });

    document.querySelector(".questions-answered").innerHTML = answersSummary;
};

// Retake quiz
document.querySelector(".retake-btn").addEventListener("click", () => {
    location.reload();
});

// Start quiz
document.querySelector(".start-btn").addEventListener("click", () => {
    userName = document.getElementById("name").value;
    userAge = document.getElementById("age").value;
    if (!userName || !userAge) {
        alert("Please enter both your name and age.");
        return;
    }
    document.querySelector(".user-info").style.display = "none";
    quizContainer.style.display = "block";
    loadQuestion();
});
