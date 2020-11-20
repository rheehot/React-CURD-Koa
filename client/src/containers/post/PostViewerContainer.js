import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PostActionButtons from '../../components/post/PostActionButtons'
import PostViewer from '../../components/post/PostViewer'
import { removePost } from '../../lib/api/posts'
import { readPost, unloadPost } from '../../modules/post'
import { setOriginalPost } from '../../modules/write'

const PostViewerContainer = ({ match, history }) => {
    //가장 처음 마운트
    const { postId } = match.params;
	const dispatch = useDispatch();
	const { post, error, loading, user } = useSelector(({ post, loading, user }) => ({
		post: post.post,
		error: post.error,
        loading: loading['post/READ_POST'],
        user: user.user, 
    }));
    
    useEffect(() => {
        dispatch(readPost(postId))

        //언마운트 => 포스트데이터 삭제
        return () => {
            dispatch(unloadPost())
        }
    }, [dispatch, postId])

    const onEdit = () => {
        dispatch(setOriginalPost(post))
        history.push('/write')
    }

    const onRemove = async () => {
        try{
            await removePost(postId)
            history.push('/')
        }catch(e) {
            console.log(e)
        }
    }

    const ownPost = (user && user._id) === (post && post.user._id);

	return (
        <>
            <PostViewer post={post} loading={loading} error={error} actionButtons={ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove}/>}/>
            
        </>
    )
};

export default withRouter(PostViewerContainer);
