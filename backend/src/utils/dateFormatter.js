/**
 * Standardize date formatting across backend logs and responses
 * @param {Date|string} date 
 * @param {string} format - 'simple' or 'detailed'
 * @returns {string}
 */
export const formatDate = (date, format = 'simple') => {
    const d = new Date(date);
    
    if (format === 'detailed') {
        return d.toLocaleString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    return d.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};

/**
 * Check if a date is today
 * @param {Date|string} date 
 * @returns {boolean}
 */
export const isToday = (date) => {
    const d = new Date(date);
    const today = new Date();
    return d.setHours(0,0,0,0) === today.setHours(0,0,0,0);
};
