// ========================================
// Local Storage Management
// ========================================

const STORAGE_KEYS = {
    QUIZ_RESULTS: 'quizmaster_results',
    CURRENT_QUIZ: 'quizmaster_current_quiz',
    USER_ANSWERS: 'quizmaster_user_answers',
    QUIZ_TIMER: 'quizmaster_timer'
};

// ========================================
// Save Functions
// ========================================

/**
 * Save quiz result to local storage
 * @param {Object} result - Quiz result object
 */
function saveQuizResult(result) {
    try {
        const results = getQuizResults();

        // Add timestamp
        result.timestamp = new Date().toISOString();
        result.date = new Date().toLocaleDateString();
        result.time = new Date().toLocaleTimeString();

        // Add to results array
        results.push(result);

        // Save to local storage
        localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(results));

        console.log('Quiz result saved successfully');
        return true;
    } catch (error) {
        console.error('Error saving quiz result:', error);
        return false;
    }
}

/**
 * Save current quiz state
 * @param {Object} quizState - Current quiz state
 */
function saveCurrentQuiz(quizState) {
    try {
        localStorage.setItem(STORAGE_KEYS.CURRENT_QUIZ, JSON.stringify(quizState));
        return true;
    } catch (error) {
        console.error('Error saving current quiz:', error);
        return false;
    }
}

/**
 * Save user answers
 * @param {Array} answers - User's answers
 */
function saveUserAnswers(answers) {
    try {
        localStorage.setItem(STORAGE_KEYS.USER_ANSWERS, JSON.stringify(answers));
        return true;
    } catch (error) {
        console.error('Error saving user answers:', error);
        return false;
    }
}

/**
 * Save timer state
 * @param {Object} timerState - Timer state
 */
function saveTimerState(timerState) {
    try {
        localStorage.setItem(STORAGE_KEYS.QUIZ_TIMER, JSON.stringify(timerState));
        return true;
    } catch (error) {
        console.error('Error saving timer state:', error);
        return false;
    }
}

// ========================================
// Get Functions
// ========================================

/**
 * Get all quiz results from local storage
 * @returns {Array} Array of quiz results
 */
function getQuizResults() {
    try {
        const results = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS);
        return results ? JSON.parse(results) : [];
    } catch (error) {
        console.error('Error getting quiz results:', error);
        return [];
    }
}

/**
 * Get current quiz state
 * @returns {Object|null} Current quiz state or null
 */
function getCurrentQuiz() {
    try {
        const quiz = localStorage.getItem(STORAGE_KEYS.CURRENT_QUIZ);
        return quiz ? JSON.parse(quiz) : null;
    } catch (error) {
        console.error('Error getting current quiz:', error);
        return null;
    }
}

/**
 * Get user answers
 * @returns {Array} User's answers
 */
function getUserAnswers() {
    try {
        const answers = localStorage.getItem(STORAGE_KEYS.USER_ANSWERS);
        return answers ? JSON.parse(answers) : [];
    } catch (error) {
        console.error('Error getting user answers:', error);
        return [];
    }
}

/**
 * Get timer state
 * @returns {Object|null} Timer state or null
 */
function getTimerState() {
    try {
        const timer = localStorage.getItem(STORAGE_KEYS.QUIZ_TIMER);
        return timer ? JSON.parse(timer) : null;
    } catch (error) {
        console.error('Error getting timer state:', error);
        return null;
    }
}

/**
 * Get results for a specific quiz
 * @param {number} quizId - Quiz ID
 * @returns {Array} Array of results for the quiz
 */
function getQuizResultsById(quizId) {
    const allResults = getQuizResults();
    return allResults.filter(result => result.quizId === quizId);
}

/**
 * Get the latest result for a specific quiz
 * @param {number} quizId - Quiz ID
 * @returns {Object|null} Latest result or null
 */
function getLatestQuizResult(quizId) {
    const results = getQuizResultsById(quizId);
    if (results.length === 0) return null;

    // Sort by timestamp and return the latest
    results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return results[0];
}

/**
 * Get statistics for all quizzes
 * @returns {Object} Statistics object
 */
function getQuizStatistics() {
    const results = getQuizResults();

    if (results.length === 0) {
        return {
            totalQuizzes: 0,
            completedQuizzes: 0,
            averageScore: 0,
            totalQuestions: 0,
            correctAnswers: 0
        };
    }

    const totalQuestions = results.reduce((sum, r) => sum + r.totalQuestions, 0);
    const correctAnswers = results.reduce((sum, r) => sum + r.correctAnswers, 0);
    const totalScore = results.reduce((sum, r) => sum + r.score, 0);

    return {
        totalQuizzes: quizData.length,
        completedQuizzes: results.length,
        averageScore: Math.round(totalScore / results.length),
        totalQuestions: totalQuestions,
        correctAnswers: correctAnswers,
        accuracy: totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0
    };
}

// ========================================
// Clear Functions
// ========================================

/**
 * Clear current quiz state
 */
function clearCurrentQuiz() {
    try {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_QUIZ);
        localStorage.removeItem(STORAGE_KEYS.USER_ANSWERS);
        localStorage.removeItem(STORAGE_KEYS.QUIZ_TIMER);
        return true;
    } catch (error) {
        console.error('Error clearing current quiz:', error);
        return false;
    }
}

/**
 * Clear all quiz results
 */
function clearAllResults() {
    try {
        localStorage.removeItem(STORAGE_KEYS.QUIZ_RESULTS);
        return true;
    } catch (error) {
        console.error('Error clearing all results:', error);
        return false;
    }
}

/**
 * Clear all quiz data
 */
function clearAllQuizData() {
    try {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        return true;
    } catch (error) {
        console.error('Error clearing all quiz data:', error);
        return false;
    }
}

/**
 * Delete a specific quiz result
 * @param {number} index - Index of the result to delete
 */
function deleteQuizResult(index) {
    try {
        const results = getQuizResults();
        if (index >= 0 && index < results.length) {
            results.splice(index, 1);
            localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(results));
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error deleting quiz result:', error);
        return false;
    }
}

// ========================================
// Utility Functions
// ========================================

/**
 * Check if local storage is available
 * @returns {boolean} True if available
 */
function isLocalStorageAvailable() {
    try {
        const test = '__localStorage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Get local storage usage
 * @returns {Object} Storage usage information
 */
function getStorageUsage() {
    let total = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            total += localStorage[key].length + key.length;
        }
    }

    return {
        used: total,
        usedKB: (total / 1024).toFixed(2),
        usedMB: (total / 1024 / 1024).toFixed(2)
    };
}

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        saveQuizResult,
        saveCurrentQuiz,
        saveUserAnswers,
        saveTimerState,
        getQuizResults,
        getCurrentQuiz,
        getUserAnswers,
        getTimerState,
        getQuizResultsById,
        getLatestQuizResult,
        getQuizStatistics,
        clearCurrentQuiz,
        clearAllResults,
        clearAllQuizData,
        deleteQuizResult,
        isLocalStorageAvailable,
        getStorageUsage
    };
}
