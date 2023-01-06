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
    console.log('take it away!');
    try{
        axios.delete(`/api/completed_chore/${action.payload.userChoreId}`)
    } catch (err){
        console.log('error removing most recent chore', err);
    }
}


function* completedChoreSaga(){
    yield takeLatest('ADD_TO_COMPLETED', addToCompleted);
    yield takeLatest('UNDO_ADD_TO_COMPLETED', undoAddToCompleted)

}

export default completedChoreSaga;