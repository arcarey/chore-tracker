import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "ADD_CHORE" actions
function* addUserChore(action){
    console.log(action.payload);
    try {
        yield axios.post('/api/user_chore', action.payload);
        yield put({ type: 'FETCH_USER_CHORES', payload: action.payload.userId})

    } catch (err){
        console.log('error adding user chore', err);
    }
}

function* fetchUserChores(action){
    try {
        console.log(action.payload);
        const userChores = yield axios.put(`/api/user_chore`, {id: action.payload});
        console.log('user chores:', userChores.data);
        yield put({ type: 'SET_USER_CHORES', payload: userChores.data})
    } catch (err) {
        console.log('Error fetching user chore list', err);
    }
}

function* fetchLoggedInUserChores(action){
    try {
        const userChores = yield axios.get(`/api/user_chore`);
        console.log('user chores:', userChores.data);
        yield put({ type: 'SET_USER_CHORES', payload: userChores.data})
    } catch (err) {
        console.log('Error fetching user chore list', err);
    }
}

function* deleteChore(action){
    try{
        yield axios.put(`/api/user_chore/delete/`, action.payload)
        yield put({type: 'FETCH_USER_CHORES', payload: action.payload.userId});
    } catch(err){
        console.log('Error deleting user chore', err);
    }
}

function* toggleIsActive(action){
    try{
        yield axios.put('/api/user_chore/toggle', action.payload)
        yield put({type: 'FETCH_LOGGED_IN_USER_CHORES'});
    } catch (err){
        console.log('Error marking or unmarking chore');
    }
}


function* userChoreSaga(){
    yield takeLatest('ADD_USER_CHORE', addUserChore);
    yield takeLatest('FETCH_USER_CHORES', fetchUserChores);
    yield takeLatest('DELETE_USER_CHORE', deleteChore);
    yield takeLatest('FETCH_LOGGED_IN_USER_CHORES', fetchLoggedInUserChores);
    yield takeLatest('TOGGLE_IS_ACTIVE', toggleIsActive)
}

export default userChoreSaga;