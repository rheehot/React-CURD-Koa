import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import WriteActionButtons from '../../components/write/WriteActionButtons'
import { updatePost, writePost } from '../../modules/write'

const WriteActionButtonsContainer = ({history}) => {
    const dispatch = useDispatch()
    const {title, body, tags, post, postError, originalPostId} = useSelector(({write}) => ({
        title: write.title,
        body: write.body,
        tags: write.tags,
        post: write.post,
        postError: write.postError,
        originalPostId: write.originalPostId,
    }))

    //포스트 등록
    const onPublish = () => {
        if(originalPostId){
            dispatch(updatePost({title, body, tags, id: originalPostId}))
            return 
        }
        dispatch(writePost({
            title, body, tags,
        }),)
    }

    //취소
    const onCancel = () => {
        history.goBack()
    }

    //성공/실패시
    useEffect(() => {
        if(post) { //성공
            const{_id, user} = post;
            history.push(`/@${user.username}/${_id}`)
        }
        if(postError){ //실패
            console.log(postError)
        }
    }, [post, postError, history])

    //isEdit 값이 존재하면 포스트 등록이 수정이 됨
    return (
        <WriteActionButtons onPublish={onPublish} onCancel={onCancel} isEdit={!!originalPostId}/>
    )
}

export default withRouter(WriteActionButtonsContainer)
