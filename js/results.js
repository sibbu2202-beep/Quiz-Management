// ========================================
// Results Page Logic
// ========================================

let currentResult = null;

$(document).ready(function () {
    console.log('Results page initialized');

    // Get quiz ID from URL
    const quizId = getUrlParameter('id');

    if (!quizId) {
        // No specific quiz, show all history
        loadAllHistory();
    } else {
        // Load specific quiz result
        loadQuizResult(parseInt(quizId));
    }

    // Setup event listeners
    setupResultsEventListeners();
});

/**
 * Load quiz result
 * @param {number} quizId - Quiz ID
 */
function loadQuizResult(quizId) {
    // Get the latest result for this quiz
    currentResult = getLatestQuizResult(quizId);

    if (!currentResult) {
        alert('No results found for this quiz!');
        window.location.href = 'index.html';
        return;
    }

    // Display results
    displayScoreCard();
    displayMetrics();
    displayAnswerReview();
    displayQuizHistory();
}

/**
 * Display score card
 */
function displayScoreCard() {
    const scoreCard = $('#scoreCard');

    // Determine icon and message based on score
    let icon, title, message;

    if (currentResult.score >= 90) {
        icon = '<i class="fas fa-trophy"></i>';
        title = 'Outstanding!';
        message = 'Excellent performance!';
    } else if (currentResult.score >= 70) {
        icon = '<i class="fas fa-star"></i>';
        title = 'Great Job!';
        message = 'You did really well!';
    } else if (currentResult.score >= 50) {
        icon = '<i class="fas fa-thumbs-up"></i>';
        title = 'Good Effort!';
        message = 'Keep practicing!';
    } else {
        icon = '<i class="fas fa-redo"></i>';
        title = 'Keep Trying!';
        message = 'Practice makes perfect!';
    }

    const scoreHtml = `
        <div class="score-card-content">
            <div class="score-icon">${icon}</div>
            <h1 class="score-title">${title}</h1>
            <div class="score-value">${currentResult.score}%</div>
            <p class="score-subtitle">${message}</p>
            <p class="text-muted mt-3">
                <i class="fas fa-graduation-cap"></i> ${currentResult.quizTitle}
            </p>
        </div>
    `;

    scoreCard.html(scoreHtml);
}

/**
 * Display performance metrics
 */
function displayMetrics() {
    // Update metric values
    $('#correctCount').text(currentResult.correctAnswers);
    $('#incorrectCount').text(currentResult.incorrectAnswers);

    // Format time taken
    const minutes = Math.floor(currentResult.timeTaken / 60);
    const seconds = currentResult.timeTaken % 60;
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    $('#timeTaken').text(timeString);

    // Calculate accuracy
    const accuracy = Math.round((currentResult.correctAnswers / currentResult.totalQuestions) * 100);
    $('#accuracyRate').text(accuracy + '%');
}

/**
 * Display answer review
 */
function displayAnswerReview() {
    const container = $('#answerReview');
    container.empty();

    if (!currentResult.detailedAnswers || currentResult.detailedAnswers.length === 0) {
        container.html('<p class="text-muted">No detailed answers available.</p>');
        return;
    }

    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    currentResult.detailedAnswers.forEach((answer, index) => {
        const statusClass = answer.isCorrect ? 'correct' : 'incorrect';
        const statusIcon = answer.isCorrect ?
            '<i class="fas fa-check-circle"></i>' :
            '<i class="fas fa-times-circle"></i>';
        const statusText = answer.isCorrect ? 'Correct' : 'Incorrect';

        let reviewHtml = `
            <div class="review-item ${statusClass}">
                <div class="review-header">
                    <span class="review-question-number">Question ${index + 1}</span>
                    <span class="review-status ${statusClass}">
                        ${statusIcon} ${statusText}
                    </span>
                </div>
                <p class="review-question-text">${answer.question}</p>
        `;

        // Show user's answer
        if (answer.userAnswer !== null) {
            reviewHtml += `
                <div class="review-answer user-answer">
                    <span class="review-answer-label">Your Answer:</span>
                    ${letters[answer.userAnswer]}. ${answer.options[answer.userAnswer]}
                </div>
            `;
        } else {
            reviewHtml += `
                <div class="review-answer user-answer">
                    <span class="review-answer-label">Your Answer:</span>
                    <em>Not answered</em>
                </div>
            `;
        }

        // Show correct answer if user was wrong
        if (!answer.isCorrect) {
            reviewHtml += `
                <div class="review-answer correct-answer">
                    <span class="review-answer-label">Correct Answer:</span>
                    ${letters[answer.correctAnswer]}. ${answer.options[answer.correctAnswer]}
                </div>
            `;
        }

        reviewHtml += `</div>`;

        container.append(reviewHtml);
    });
}

/**
 * Display quiz history
 */
function displayQuizHistory() {
    const container = $('#quizHistory');
    container.empty();

    const allResults = getQuizResults();

    if (allResults.length === 0) {
        container.html('<p class="text-muted">No quiz history available.</p>');
        return;
    }

    // Sort by timestamp (newest first)
    allResults.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Show last 10 results
    const recentResults = allResults.slice(0, 10);

    recentResults.forEach((result, index) => {
        const historyHtml = `
            <div class="history-item">
                <div class="history-header">
                    <div class="history-quiz-name">
                        <i class="fas fa-graduation-cap"></i> ${result.quizTitle}
                    </div>
                    <div class="history-score">${result.score}%</div>
                </div>
                <div class="history-details">
                    <span>
                        <i class="fas fa-calendar"></i> ${result.date}
                    </span>
                    <span>
                        <i class="fas fa-clock"></i> ${result.time}
                    </span>
                    <span>
                        <i class="fas fa-check-circle text-success"></i> ${result.correctAnswers}/${result.totalQuestions}
                    </span>
                </div>
            </div>
        `;

        container.append(historyHtml);
    });
}

/**
 * Load all quiz history (when no specific quiz is selected)
 */
function loadAllHistory() {
    // Hide score card and metrics
    $('.results-hero').hide();
    $('.metrics-grid').hide();
    $('.answer-review-section').hide();

    // Show only history
    displayQuizHistory();

    // Update page title
    $('h1').text('Quiz History');
}

/**
 * Setup event listeners for results page
 */
function setupResultsEventListeners() {
    // Retake quiz button
    $('#retakeBtn').on('click', function () {
        if (currentResult) {
            window.location.href = `quiz.html?id=${currentResult.quizId}`;
        }
    });

    // History item click - could add functionality to view specific result
    $(document).on('click', '.history-item', function () {
        // Could implement viewing specific historical result
        console.log('History item clicked');
    });
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

/**
 * Format score with color
 * @param {number} score - Score percentage
 * @returns {string} Color class
 */
function getScoreColor(score) {
    if (score >= 90) return 'success';
    if (score >= 70) return 'info';
    if (score >= 50) return 'warning';
    return 'danger';
}

/**
 * Generate performance insights
 * @param {Object} result - Quiz result
 * @returns {Array} Array of insight strings
 */
function generateInsights(result) {
    const insights = [];

    const accuracy = (result.correctAnswers / result.totalQuestions) * 100;

    if (accuracy === 100) {
        insights.push('Perfect score! You mastered this quiz!');
    } else if (accuracy >= 90) {
        insights.push('Excellent work! You have a strong understanding of the topic.');
    } else if (accuracy >= 70) {
        insights.push('Good job! Review the questions you missed to improve further.');
    } else if (accuracy >= 50) {
        insights.push('You\'re on the right track. Keep studying and try again!');
    } else {
        insights.push('Don\'t give up! Review the material and retake the quiz.');
    }

    // Time-based insights
    const avgTimePerQuestion = result.timeTaken / result.totalQuestions;
    if (avgTimePerQuestion < 30) {
        insights.push('You completed the quiz quickly. Make sure to read questions carefully.');
    } else if (avgTimePerQuestion > 120) {
        insights.push('Take your time, but try to improve your speed with practice.');
    }

    // Unanswered questions
    if (result.unanswered > 0) {
        insights.push(`You left ${result.unanswered} question(s) unanswered. Try to answer all questions next time.`);
    }

    return insights;
}

/**
 * Share results (could be extended to social media)
 * @param {Object} result - Quiz result
 */
function shareResults(result) {
    const shareText = `I scored ${result.score}% on "${result.quizTitle}" quiz! 🎓`;

    // Copy to clipboard
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Results copied to clipboard!');
        }).catch(() => {
            alert('Failed to copy results.');
        });
    } else {
        alert(shareText);
    }
}

/**
 * Print results
 */
function printResults() {
    window.print();
}
