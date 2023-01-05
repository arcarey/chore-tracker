import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchChildren(action){
    try {
        const chores = yield axios.get('/api/family/family_list');
        yield put({ type: 'SET_CHILDREN', payload: chores.data})
    } catch (err) {
        console.log('Error fetching child list', err);
    }
}

function* deleteChild(action){
    try{
        yield axios.delete(`/api/family/family_list/${action.payload.id}`)
        yield put({type: 'FETCH_CHILDREN'})
    } catch (err){
        console.log('Error Deleting child', err);
    }
}


function* choreSaga(){
    
    yield takeLatest('FETCH_CHILDREN', fetchChildren);
    yield takeLatest('DELETE_CHILD', deleteChild);
}

export default choreSaga;