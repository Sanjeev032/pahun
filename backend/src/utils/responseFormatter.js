/**
 * Standardize successful API responses
 * @param {any} data - The data to send
 * @param {string} message - Success message
 * @returns {Object}
 */
export const successResponse = (data, message = 'Success') => {
    return {
        success: true,
        message,
        data,
    };
};

/**
 * Standardize error API responses
 * @param {string} message - Error message
 * @param {any} errors - Detailed errors (validation, etc.)
 * @returns {Object}
 */
export const errorResponse = (message = 'Error occurred', errors = null) => {
    return {
        success: false,
        message,
        errors,
    };
};
