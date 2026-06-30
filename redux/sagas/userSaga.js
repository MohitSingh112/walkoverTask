import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_USERS_REQUEST } from '../actions/types';
import { fetchUsersSuccess, fetchUsersFailure } from '../actions/userActions';

function fetchUsersFromApi() {
    return fetch('https://randomuser.me/api/?results=50&inc=name,email,picture')
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch");
            return response.json();
        });
}

function* handleFetchUsers() {
    try {
        const data = yield call(fetchUsersFromApi);
        yield put(fetchUsersSuccess(data.results));
    } catch (error) {
        yield put(fetchUsersFailure(error.message));
    }
}

export default function* userSaga() {
    yield takeLatest(FETCH_USERS_REQUEST, handleFetchUsers);
}