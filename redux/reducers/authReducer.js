import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from '../actions/types';

const initialState = {
    isLoggedIn: false,
    loading: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true };
        case LOGIN_SUCCESS:
            return { ...state, isLoggedIn: true, loading: false };
        case LOGOUT:
            return { ...initialState }; 
        default:
            return state;
    }
};

export default authReducer;