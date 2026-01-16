// ========================================
// Main Application Logic (Homepage)
// ========================================

$(document).ready(function () {
    console.log('QuizMaster initialized');

    // Check if local storage is available
    if (!isLocalStorageAvailable()) {
        alert('Local storage is not available. Quiz results will not be saved.');
    }

    // Initialize the application
    initializeApp();

    // Load quiz cards
    loadQuizCards();

    // Update statistics
    updateStatistics();

    // Setup event listeners
    setupEventListeners();

    // Smooth scrolling
    setupSmoothScroll();
});

/**
 * Initialize the application
 */
function initializeApp() {
    // Clear any incomplete quiz sessions
    const currentQuiz = getCurrentQuiz();
    if (currentQuiz) {
        console.log('Found incomplete quiz session');
        // You could prompt user to continue or clear it
        // For now, we'll clear it
        clearCurrentQuiz();
    }
}

/**
 * Load quiz cards into the container
 */
function loadQuizCards() {
    const container = $('#quizContainer');
    container.empty();

    if (!quizData || quizData.length === 0) {
        container.html('<div class="col-12"><p class="text-center text-muted">No quizzes available</p></div>');
        return;
    }

    quizData.forEach(quiz => {
        const card = createQuizCard(quiz);
        container.append(card);
    });

    // Add click handlers to quiz cards
    $('.quiz-card').on('click', function () {
        const quizId = $(this).data('quiz-id');
        startQuiz(quizId);
    });
}

/**
 * Create a quiz card HTML element
 * @param {Object} quiz - Quiz data object
 * @returns {string} HTML string for the quiz card
 */
function createQuizCard(quiz) {
    const difficultyClass = `difficulty-${quiz.difficulty}`;
    const latestResult = getLatestQuizResult(quiz.id);
    const hasAttempted = latestResult !== null;

    return `
        <div class="col-md-6 col-lg-4">
            <div class="quiz-card" data-quiz-id="${quiz.id}">
                <div class="quiz-card-icon">
                    <i class="fas ${quiz.icon}"></i>
                </div>
                <h3 class="quiz-card-title">${quiz.title}</h3>
                <p class="quiz-card-description">${quiz.description}</p>
                
                <div class="quiz-card-meta">
                    <div class="meta-item">
                        <i class="fas fa-question-circle"></i>
                        <span>${quiz.questions.length} Questions</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${quiz.duration} mins</span>
                    </div>
                </div>
                
                <div class="quiz-card-footer">
                    <span class="difficulty-badge ${difficultyClass}">
                        ${quiz.difficulty}
                    </span>
                    ${hasAttempted ? `
                        <span class="text-muted small">
                            <i class="fas fa-check-circle text-success"></i> 
                            Last Score: ${latestResult.score}%
                        </span>
                    ` : `
                        <span class="text-muted small">
                            <i class="fas fa-play-circle"></i> Not attempted
                        </span>
                    `}
                </div>
            </div>
        </div>
    `;
}

/**
 * Start a quiz
 * @param {number} quizId - Quiz ID
 */
function startQuiz(quizId) {
    const quiz = quizData.find(q => q.id === quizId);

    if (!quiz) {
        alert('Quiz not found!');
        return;
    }

    // Save quiz to local storage
    saveCurrentQuiz({
        quizId: quiz.id,
        startTime: new Date().toISOString(),
        currentQuestion: 0
    });

    // Redirect to quiz page
    window.location.href = `quiz.html?id=${quizId}`;
}

/**
 * Update statistics on the homepage
 */
function updateStatistics() {
    const stats = getQuizStatistics();

    // Animate numbers
    animateValue('totalQuizzes', 0, stats.totalQuizzes, 1000);
    animateValue('completedQuizzes', 0, stats.completedQuizzes, 1000);

    // Update average score
    $('#avgScore').text(stats.averageScore + '%');
}

/**
 * Animate a number value
 * @param {string} id - Element ID
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} duration - Animation duration in ms
 */
function animateValue(id, start, end, duration) {
    const element = document.getElementById(id);
    if (!element) return;

    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 16);
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Clear data button
    $('#clearDataBtn').on('click', function (e) {
        e.preventDefault();

        if (confirm('Are you sure you want to clear all quiz data? This action cannot be undone.')) {
            if (clearAllQuizData()) {
                alert('All quiz data has been cleared successfully!');
                location.reload();
            } else {
                alert('Failed to clear quiz data. Please try again.');
            }
        }
    });
}

/**
 * Setup smooth scrolling
 */
function setupSmoothScroll() {
    $('a.smooth-scroll').on('click', function (e) {
        const target = $(this).attr('href');

        if (target.startsWith('#')) {
            e.preventDefault();

            $('html, body').animate({
                scrollTop: $(target).offset().top - 80
            }, 800);
        }
    });
}

/**
 * Format time in MM:SS format
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Get difficulty color
 * @param {string} difficulty - Difficulty level
 * @returns {string} Color class
 */
function getDifficultyColor(difficulty) {
    const colors = {
        'easy': 'success',
        'medium': 'warning',
        'hard': 'danger'
    };
    return colors[difficulty] || 'secondary';
}

/**
 * Show notification
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = $(`
        <div class="alert alert-${type} alert-dismissible fade show position-fixed" 
             style="top: 100px; right: 20px; z-index: 9999; min-width: 300px;" 
             role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `);

    // Add to body
    $('body').append(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.alert('close');
    }, 5000);
}

// ========================================
// Utility Functions
// ========================================

/**
 * Get URL parameter
 * @param {string} name - Parameter name
 * @returns {string|null} Parameter value or null
 */
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

/**
 * Shuffle array
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
