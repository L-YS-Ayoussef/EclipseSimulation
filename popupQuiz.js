
const questions = [
    {
        question: "What is a solar eclipse?",
        choices: ["When the Earth comes between the Sun and the Moon", "When the Moon comes between the Earth and the Sun", "When the Sun comes between the Earth and the Moon"],
        correctAnswer: 1
    },
    {
        question: "What is a lunar eclipse?",
        choices: ["When the Earth comes between the Sun and the Moon", "When the Moon comes between the Earth and the Sun", "When the Sun comes between the Earth and the Moon"],
        correctAnswer: 0
    },
    {
        question: "During a solar eclipse, what gets blocked out?",
        choices: ["Earth's light", "Moon's light", "Sun's light"],
        correctAnswer: 2
    },
    {
        question: "During a lunar eclipse, what gets blocked out?",
        choices: ["Earth's light", "Moon's light", "Sun's light"],
        correctAnswer: 1
    }
];

let currentQuestionIndex = 0;

document.getElementById('start-quiz').addEventListener('click', startQuiz);
document.querySelector('.close2').addEventListener('click', closeQuizPopup);
document.getElementById('next-button').addEventListener('click', nextQuestion);

function startQuiz() {
    document.getElementById('start-quiz').style.display = 'none';
    document.getElementById('quiz-popup').style.display = 'block';
    displayQuestion();
}

function displayQuestion() {
    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');
    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = '';

    currentQuestion.choices.forEach((choice, index) => {
        const choiceItem = document.createElement('li'); // Create a list item
        choiceItem.classList.add('choice-item');

        const choiceBullet = document.createElement('div'); // Create an empty circle as the index
        choiceBullet.classList.add('choice-bullet');

        const choiceButton = document.createElement('button'); // Create a choice button
        choiceButton.textContent = choice;
        choiceButton.classList.add('choice-button');
        choiceButton.onclick = () => checkAnswer(index, choiceBullet);

        choiceItem.appendChild(choiceBullet); // Add the empty circle to the list item
        choiceItem.appendChild(choiceButton); // Add the choice button to the list item

        choicesElement.appendChild(choiceItem); // Add the list item to the choices list
    });
    document.getElementById('next-button').style.display = 'none';
}

function checkAnswer(userChoice, choiceBullet) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctIndex = currentQuestion.correctIndex;
    const choicesButtons = document.querySelectorAll('#choices button');

    if (userChoice === currentQuestion.correctAnswer) {
        choicesButtons[userChoice].style.backgroundColor = 'green';
        choiceBullet.textContent = '✔';
    } else {
        choicesButtons[userChoice].style.backgroundColor = 'red';
        choicesButtons[currentQuestion.correctAnswer].style.backgroundColor = 'green';
        choiceBullet.textContent = '🗴';
        // const correctChoiceBullet = document.querySelector('.choice-item:nth-child(' + (correctIndex + 1) + ') .choice-bullet');
        // correctChoiceBullet.textContent = '✔'; 
    }

    document.getElementById('next-button').style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        // End of the quiz
        document.getElementById('quiz-popup').style.display = 'none';
    }
}

function closeQuizPopup() {
    document.getElementById('quiz-popup').style.display = 'none';
}