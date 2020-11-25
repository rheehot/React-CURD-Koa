import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { commentsRead } from '../../modules/comments'
import CommentList from '../../components/comments/CommentList'
import Button from '../../components/common/Button'

const CommentListContainer = ({ match }) => {
    const { postId } = match.params
    const dispatch = useDispatch()

    const { comments, error, loading } = useSelector(({ comments, loading }) => ({
        comments: comments.comments,
        error: comments.error,
        loading: loading['comments/COMMENTS_READ'],
    }))

    useEffect(() => {
        dispatch(commentsRead(postId))
    }, [dispatch, postId])

    const onRefresh = (e) => {
        dispatch(commentsRead(postId))
    }

    return (
        <>
        <Button onClick={onRefresh}>새로 고침</Button>
        <CommentList comments={comments} loading={loading} error={error} />
        </>
    )
}

export default withRouter(CommentListContainer)