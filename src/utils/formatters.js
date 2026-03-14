import { CURRENCY } from './constants';

/**
 * Format number to currency string
 * @param {number} amount 
 * @returns {string}
 */
export const formatCurrency = (amount) => {
    return `${CURRENCY}${Number(amount).toLocaleString('en-IN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    })}`;
};

/**
 * Standardize date formatting for UI
 * @param {Date|string} date 
 * @returns {string}
 */
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};

/**
 * Capitalize first letter of a string
 * @param {string} str 
 * @returns {string}
 */
export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};
