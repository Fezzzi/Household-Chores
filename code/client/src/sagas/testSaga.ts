import  { takeEvery, call, put } from "redux-saga/effects";
import { TestActions } from "clientSrc/actions/testActions";
import { getTestData } from "clientSrc/effects/testEffects";

function* getTestDataSaga() {
    try {
        const response = yield call(getTestData);
        yield put(TestActions.Creators.dataLoaded(response.data));
    } catch (error) {
        console.error(error);
    }
}

export function* testSaga() {
    yield takeEvery(TestActions.Types.GET_DATA, getTestDataSaga);
}
