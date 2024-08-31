
/* API routes */
export const API_ROUTE_CYCLE = "cycle";

export const SESSION_KEYS = {
    IS_LOGGED_IN: 'isLoggedIn',
    USER_ID: 'userId',
};

export const API_ENDPOINTS = {
    LOGIN: '/api/login',
    GET_CYCLES: '/api/getCycles',
    ADD_CYCLE: '/api/addCycle',
    GET_USER_CYCLE_INFO: '/api/getUserCycleInfo',
    UPDATE_USER_CYCLE_INFO: '/api/updateUserCycleInfo',
};

export const MESSAGES = {
    LOGIN_SUCCESS: 'Login successful',
    LOGIN_FAILED: 'Failed to log in',
    ADD_CYCLE_SUCCESS: 'Cycle added successfully',
    ADD_CYCLE_FAILED: 'Failed to add cycle',
};