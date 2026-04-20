const questions = [
    {
        question: "¿Qué país ha ganado más Copas del Mundo de la FIFA?",
        options: ["Alemania", "Italia", "Brasil", "Argentina"],
        correct: 2 // Brasil
    },
    {
        question: "¿Quién es el máximo goleador histórico de la Champions League?",
        options: ["Lionel Messi", "Cristiano Ronaldo", "Robert Lewandowski", "Karim Benzema"],
        correct: 1 // Cristiano Ronaldo
    },
    {
        question: "¿En qué club jugaba Lionel Messi antes de unirse al PSG?",
        options: ["FC Barcelona", "Newell's Old Boys", "Manchester City", "Inter Miami"],
        correct: 0 // FC Barcelona
    },
    {
        question: "¿Qué selección ganó la Eurocopa 2024?",
        options: ["Inglaterra", "Francia", "España", "Italia"],
        correct: 2 // España
    },
    {
        question: "¿Cuál es el estadio de fútbol más grande del mundo?",
        options: ["Camp Nou", "Wembley", "Maracaná", "Rungrado Primero de Mayo"],
        correct: 3 // Rungrado Primero de Mayo
    }
];

let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionCounter = document.getElementById('question-counter');
const progressBar = document.getElementById('progress-bar');
const finalScore = document.getElementById('final-score');
const resultTitle = document.getElementById('result-title');
const resultText = document.getElementById('result-text');
const resultIcon = document.getElementById('result-icon');

// Event Listeners
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    showScreen(quizScreen);
    loadQuestion();
}

function showScreen(screen) {
    [startScreen, quizScreen, resultScreen].forEach(s => {
        s.classList.remove('active');
    });
    screen.classList.add('active');
}

function loadQuestion() {
    const q = questions[currentQuestionIndex];
    questionText.innerText = q.question;
    questionCounter.innerText = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;
    
    // Update progress bar
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;

    optionsContainer.innerHTML = '';
    q.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });
}

function selectOption(selectedIndex) {
    const q = questions[currentQuestionIndex];
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    
    // Disable all buttons after selection
    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === q.correct) {
        score++;
        buttons[selectedIndex].classList.add('correct');
    } else {
        buttons[selectedIndex].classList.add('incorrect');
        buttons[q.correct].classList.add('correct');
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    // Update final progress to 100%
    progressBar.style.width = '100%';
    
    finalScore.innerText = score;
    showScreen(resultScreen);

    if (score === questions.length) {
        resultTitle.innerText = "¡Felicidades Ganador!";
        resultText.innerText = "¡Eres un experto total en fútbol!";
        resultIcon.innerText = "🏆";
        launchConfetti();
    } else if (score >= 3) {
        resultTitle.innerText = "¡Muy bien!";
        resultText.innerText = "Sabes bastante, pero puedes mejorar.";
        resultIcon.innerText = "⭐";
    } else {
        resultTitle.innerText = "¡Sigue intentando!";
        resultText.innerText = "Parece que necesitas ver más partidos.";
        resultIcon.innerText = "⚽";
    }
}

function launchConfetti() {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#2ecc71', '#f1c40f', '#ffffff']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#2ecc71', '#f1c40f', '#ffffff']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}
