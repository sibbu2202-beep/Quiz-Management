// ========================================
// Quiz Taking Logic
// ========================================

let currentQuizData = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let timerInterval = null;
let startTime = null;
let elapsedSeconds = 0;

$(document).ready(function () {
    console.log('Quiz page initialized');

    // Get quiz ID from URL
    const quizId = getUrlParameter('id');

    if (!quizId) {
        alert('No quiz selected!');
        window.location.href = 'index.html';
        return;
    }

    // Load the quiz
    loadQuiz(parseInt(quizId));

    // Setup event listeners
    setupQuizEventListeners();
});

/**
 * Load quiz data and initialize
 * @param {number} quizId - Quiz ID
 */
function loadQuiz(quizId) {
    // Find quiz in data
    currentQuizData = quizData.find(q => q.id === quizId);

    if (!currentQuizData) {
        alert('Quiz not found!');
        window.location.href = 'index.html';
        return;
    }

    // Initialize user answers array
    userAnswers = new Array(currentQuizData.questions.length).fill(null);

    // Update quiz header
    $('#quizTitle').text(currentQuizData.title);
    $('#quizDescription').text(currentQuizData.description);

    // Initialize question dots
    initializeQuestionDots();

    // Start timer
    startTimer();

    // Load first question
    loadQuestion(0);
}

/**
 * Initialize question navigation dots
 */
function initializeQuestionDots() {
    const dotsContainer = $('#questionDots');
    dotsContainer.empty();

    for (let i = 0; i < currentQuizData.questions.length; i++) {
        const dot = $(`<div class="question-dot" data-question="${i}"></div>`);
        dotsContainer.append(dot);
    }

    // Add click handlers
    $('.question-dot').on('click', function () {
        const questionIndex = $(this).data('question');
        loadQuestion(questionIndex);
    });
}

/**
 * Load a specific question
 * @param {number} index - Question index
 */
function loadQuestion(index) {
    if (index < 0 || index >= currentQuizData.questions.length) {
        return;
    }

    currentQuestionIndex = index;
    const question = currentQuizData.questions[index];

    // Update question counter
    $('#questionCounter').text(`${index + 1}/${currentQuizData.questions.length}`);
    $('#questionNumber').text(`Question ${index + 1}`);

    // Update question text
    $('#questionText').text(question.question);

    // Load answer options
    loadAnswerOptions(question, index);

    // Update progress bar
    updateProgressBar();

    // Update navigation buttons
    updateNavigationButtons();

    // Update question dots
    updateQuestionDots();
}

/**
 * Load answer options for a question
 * @param {Object} question - Question object
 * @param {number} questionIndex - Question index
 */
function loadAnswerOptions(question, questionIndex) {
    const container = $('#answersContainer');
    container.empty();

    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    question.options.forEach((option, index) => {
        const isSelected = userAnswers[questionIndex] === index;
        const selectedClass = isSelected ? 'selected' : '';

        const optionHtml = `
            <div class="answer-option ${selectedClass}" data-answer="${index}">
                <div class="answer-letter">${letters[index]}</div>
                <div class="answer-text">${option}</div>
            </div>
        `;

        container.append(optionHtml);
    });

    // Add click handlers
    $('.answer-option').on('click', function () {
        selectAnswer($(this).data('answer'));
    });
}

/**
 * Select an answer
 * @param {number} answerIndex - Answer index
 */
function selectAnswer(answerIndex) {
    // Save answer
    userAnswers[currentQuestionIndex] = answerIndex;

    // Save to local storage
    saveUserAnswers(userAnswers);

    // Update UI
    $('.answer-option').removeClass('selected');
    $(`.answer-option[data-answer="${answerIndex}"]`).addClass('selected');

    // Update question dots
    updateQuestionDots();
}

/**
 * Update progress bar
 */
function updateProgressBar() {
    const answeredCount = userAnswers.filter(a => a !== null).length;
    const progress = (answeredCount / currentQuizData.questions.length) * 100;

    $('#progressBar').css('width', progress + '%');
    $('#progressText').text(`${Math.round(progress)}% Complete`);
}

/**
 * Update navigation buttons
 */
function updateNavigationButtons() {
    // Previous button
    if (currentQuestionIndex === 0) {
        $('#prevBtn').prop('disabled', true);
    } else {
        $('#prevBtn').prop('disabled', false);
    }

    // Next/Submit button
    if (currentQuestionIndex === currentQuizData.questions.length - 1) {
        $('#nextBtn').hide();
        $('#submitBtn').show();
    } else {
        $('#nextBtn').show();
        $('#submitBtn').hide();
    }
}

/**
 * Update question dots
 */
function updateQuestionDots() {
    $('.question-dot').each(function (index) {
        $(this).removeClass('answered current');

        if (userAnswers[index] !== null) {
            $(this).addClass('answered');
        }

        if (index === currentQuestionIndex) {
            $(this).addClass('current');
        }
    });
}

/**
 * Start the quiz timer
 */
function startTimer() {
    startTime = new Date();
    elapsedSeconds = 0;

    timerInterval = setInterval(() => {
        elapsedSeconds++;
        updateTimerDisplay();
    }, 1000);
}

/**
 * Update timer display
 */
function updateTimerDisplay() {
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    $('#timer').text(timeString);
}

/**
 * Stop the timer
 */
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

/**
 * Setup event listeners for quiz page
 */
function setupQuizEventListeners() {
    // Previous button
    $('#prevBtn').on('click', function () {
        if (currentQuestionIndex > 0) {
            loadQuestion(currentQuestionIndex - 1);
        }
    });

    // Next button
    $('#nextBtn').on('click', function () {
        if (currentQuestionIndex < currentQuizData.questions.length - 1) {
            loadQuestion(currentQuestionIndex + 1);
        }
    });

    // Submit button
    $('#submitBtn').on('click', function () {
        showSubmitModal();
    });

    // Confirm submit
    $('#confirmSubmit').on('click', function () {
        submitQuiz();
    });

    // Prevent accidental page close
    window.addEventListener('beforeunload', function (e) {
        if (timerInterval) {
            e.preventDefault();
            e.returnValue = '';
        }
    });
}

/**
 * Show submit confirmation modal
 */
function showSubmitModal() {
    const answeredCount = userAnswers.filter(a => a !== null).length;
    const totalQuestions = currentQuizData.questions.length;

    $('#answeredCount').text(answeredCount);
    $('#totalQuestions').text(totalQuestions);

    const modal = new bootstrap.Modal(document.getElementById('submitModal'));
    modal.show();
}

/**
 * Submit the quiz and calculate results
 */
function submitQuiz() {
    // Stop timer
    stopTimer();

    // Calculate results
    const results = calculateResults();

    // Save results to local storage
    saveQuizResult(results);

    // Clear current quiz state
    clearCurrentQuiz();

    // Redirect to results page
    window.location.href = `results.html?id=${currentQuizData.id}`;
}

/**
 * Calculate quiz results
 * @returns {Object} Results object
 */
function calculateResults() {
    let correctCount = 0;
    let incorrectCount = 0;
    const detailedAnswers = [];

    currentQuizData.questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;

        if (isCorrect) {
            correctCount++;
        } else if (userAnswer !== null) {
            incorrectCount++;
        }

        detailedAnswers.push({
            questionId: question.id,
            question: question.question,
            options: question.options,
            userAnswer: userAnswer,
            correctAnswer: question.correctAnswer,
            isCorrect: isCorrect
        });
    });

    const score = Math.round((correctCount / currentQuizData.questions.length) * 100);

    return {
        quizId: currentQuizData.id,
        quizTitle: currentQuizData.title,
        totalQuestions: currentQuizData.questions.length,
        correctAnswers: correctCount,
        incorrectAnswers: incorrectCount,
        unanswered: currentQuizData.questions.length - correctCount - incorrectCount,
        score: score,
        timeTaken: elapsedSeconds,
        detailedAnswers: detailedAnswers
    };
}

/**
 * Get URL parameter
 * @param {string} name - Parameter name
 * @returns {string|null} Parameter value or null
 */
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
