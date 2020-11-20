import { createAction, handleActions } from 'redux-actions'
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga'
import * as postsAPI from '../lib/api/posts'
import { takeLatest } from 'redux-saga/effects'

const INITIALIZE = 'comment/INITIALIZE'
const CHANGE_FIELD = 'comment/CHANGE_FIELD'

const [
    COMMENT_POST,
    COMMENT_POST_SUCCESS,
    COMMENT_POST_FAILURE,
] = createRequestActionTypes('comment/COMMENT_POST')

export const initialize = createAction(INITIALIZE)
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
    key,
    value,
}))

export const commentPost = createAction(COMMENT_POST, ({ postId, body }) => ({
    postId,
    body
}))

//사가 생성
const commentPostSaga = createRequestSaga(COMMENT_POST, postsAPI.commentPost)

export function* commentSaga() {
    yield takeLatest(COMMENT_POST, commentPostSaga)
}

const initialState = {
    body: '',
    comment: null,
    error: null,
}

const comment = handleActions(
    {
        [INITIALIZE]: state => initialState,
        [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
            ...state,
            [key]: value,
        }),
        [COMMENT_POST]: state => ({
            ...state,
            comment: null,
            error: null,
        }),
        [COMMENT_POST_SUCCESS]: (state, { payload: comment }) => ({
            ...state,
            comment,
        }),
        [COMMENT_POST_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        }),
    }, initialState
)

export default comment