import { createAction, handleActions } from 'redux-actions'
import * as postsAPI from '../lib/api/posts'
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga'
import { takeLatest } from 'redux-saga/effects'

const [
    COMMENTS_READ,
    COMMENTS_READ_SUCCESS,
    COMMENTS_READ_FAILURE,
] = createRequestActionTypes('comments/COMMENTS_READ')

export const commentsRead = createAction(COMMENTS_READ, id => id)

//사가 생성
const commentsReadSaga = createRequestSaga(COMMENTS_READ, postsAPI.commentsRead)

export function* commentsSaga() {
    yield takeLatest(COMMENTS_READ, commentsReadSaga)
}

const initialState = {
    comments: null,
    error: null,
}

const comments = handleActions(
    {
        [COMMENTS_READ_SUCCESS]: (state, { payload: comments }) => ({
            ...state,
            comments,
        }),
        [COMMENTS_READ_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        }),
    }, initialState,
)

export default comments