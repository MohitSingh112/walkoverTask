import { call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN_REQUEST, LOGOUT } from '../actions/types';
import { loginSuccess } from '../actions/authActions';


function* handleLogin(action) {
    const { email, password } = action.payload;
    try {
      
        if (email.trim() === 'm@walkover.com' && password.trim() === '1234') {
            
            yield call([AsyncStorage, 'setItem'], 'isLoggedIn', 'true');
            yield put(loginSuccess());
        } else {
            console.log("Invalid credentials");
        }
    } catch (error) {
        console.log("Login Error: ", error);
    }
}

function* handleLogout() {
    try {
        yield call([AsyncStorage, 'removeItem'], 'isLoggedIn');
    } catch (error) {
        console.log("Logout Error: ", error);
    }
}


export default function* authSaga() {
    yield takeLatest(LOGIN_REQUEST, handleLogin);
    yield takeLatest(LOGOUT, handleLogout);
}