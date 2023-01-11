import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addToCompleted(action){
    try{
        yield axios.post('/api/completed_chore', action.payload)
    } catch(err) {
        console.log('error adding completed chore', err);
    }
}

function* undoAddToCompleted(action){
    try{
        yield axios.delete(`/api/completed_chore/${action.payload.userChoreId}`)
    } catch (err){
        console.log('error removing most recent chore', err);
    }
}

function* fetchCompletedChores(action){
    try {
        const chores = yield axios.get('/api/completed_chore');
        yield put({type: 'SET_COMPLETED_CHORES', payload: chores.data})
    } catch (error) {
        console.log('error fetching completed chores', error);
    }
}


function* completedChoreSaga(){
    yield takeLatest('ADD_TO_COMPLETED', addToCompleted);
    yield takeLatest('UNDO_ADD_TO_COMPLETED', undoAddToCompleted);
    yield takeLatest('FETCH_COMPLETED_CHORES', fetchCompletedChores)

}

export default completedChoreSaga;