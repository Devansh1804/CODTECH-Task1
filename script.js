document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    const resultElement = document.getElementById('result');

    const questions = [
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris"
        },
        {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            answer: "4"
        },
        {
            question: "What is the largest planet in our solar system?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: "Jupiter"
        },
        {
            question: "Who wrote 'To Kill a Mockingbird'?",
            options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
            answer: "Harper Lee"
        }
    ];

    let currentQuestionIndex = 0;
    let correctAnswers = 0;

    function loadQuestion() {
        if (currentQuestionIndex >= questions.length) {
            showResults();
            return;
        }

        const question = questions[currentQuestionIndex];

        quizContainer.innerHTML = `
            <div class="quiz-question">${question.question}</div>
            ${question.options.map(option => `
                <button class="quiz-option" data-answer="${option}">${option}</button>
            `).join('')}
            <button id="${currentQuestionIndex === questions.length - 1 ? 'submit-btn' : 'next-btn'}">
                ${currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
            </button>
        `;

        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.quiz-option').forEach(btn => btn.classList.remove('selected'));
                option.classList.add('selected');
            });
        });

        document.getElementById(currentQuestionIndex === questions.length - 1 ? 'submit-btn' : 'next-btn').addEventListener('click', () => {
            const selectedOption = document.querySelector('.quiz-option.selected');
            if (selectedOption) {
                const selectedAnswer = selectedOption.getAttribute('data-answer');
                if (selectedAnswer === question.answer) {
                    correctAnswers++;
                }
            }
            currentQuestionIndex++;
            loadQuestion();
        });
    }

    function showResults() {
        resultElement.innerHTML = `
            You answered ${correctAnswers} out of ${questions.length} questions correctly.
            <a href="final.html" class="btn">NEXT</a>
        `;
        quizContainer.innerHTML = ''; // Clear quiz container
    }

    loadQuestion();
});
