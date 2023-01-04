import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "ADD_CHORE" actions
function* addChore(action){
    console.log(action.payload);
    try {
        yield axios.post('/api/chore', action.payload);
        yield put({ type: 'FETCH_CHORES'})

    } catch (err){
        console.log('error adding chore', err);
    }
}

function* fetchChores(action){
    console.log(action.payload)
    try {
        const chores = yield axios.get('/api/chore');
        yield put({ type: 'SET_CHORES', payload: chores.data})
    } catch (err) {
        console.log('Error fetching chore list', err);
    }
}


function* choreSaga(){
    yield takeLatest('ADD_CHORE', addChore);
    yield takeLatest('FETCH_CHORES', fetchChores);
}

export default choreSaga;