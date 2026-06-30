import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from './types';

export const loginRequest = (email, password) => ({
    type: LOGIN_REQUEST,
    payload: { email, password }
});

export const loginSuccess = () => ({
    type: LOGIN_SUCCESS
});

export const logout = () => ({
    type: LOGOUT
});