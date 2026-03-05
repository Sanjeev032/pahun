export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('pahunn_state', serializedState);
    } catch (err) {
        // Ignore write errors
    }
};

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('pahunn_state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};
