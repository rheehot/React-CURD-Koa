import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CommentActionButton from '../../components/comment/CommentActionButton'
import { commentPost } from '../../modules/comment'
import { commentsRead } from '../../modules/comments'

const WriteActionButtonsContainer = ({history, match}) => {
    const dispatch = useDispatch()

    const {postId} = match.params

    const {body, comment, error, user} = useSelector(({comment, user}) => ({
        body: comment.body,
        comment: comment.comment,
        error: comment.error,
        user: user.user
    }))

    
    const onPublish = () => {
        dispatch(commentPost({postId, body}))
    }

    useEffect(() => {
        if(comment) {
            dispatch(commentsRead(postId))
        }else if(error){
            console.log(error)
        }
    },[dispatch, comment, error, history, postId])

    return (
        <CommentActionButton onPublish={onPublish} isLogin={!!user}/>
    )
}

export default withRouter(WriteActionButtonsContainer)
