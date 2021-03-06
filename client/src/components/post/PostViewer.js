import React from 'react'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import EditorContainer from '../../containers/comment/EditorContainer'
import CommentListContainer from '../../containers/post/CommentListContainer'
import palette from '../../lib/styles/palette'
import Responsive from '../common/Responsive'
import SubInfo from '../common/SubInfo'
import Tags from '../common/Tags'
import NotFound from '../error/NotFound'

 const PostViewerBlock = styled(Responsive)`
    margin-top: 4rem;
 `

 const PostHead = styled.div`
    border-bottom: 1px solid ${palette.gray[2]};
    padding-bottom: 3rem;
    margin-bottom: 3rem;
    h1 {
        font-size: 3rem;
        line-height: 1.5;
        margin: 0;
    }
 `

 const PostContent = styled.div`
    font-size: 1.3125rem;
    color: ${palette.gray[8]};
    border-bottom: 2px solid ${palette.cyan[8]};
    img {
        max-width: 50vw;
    }
 `

 const PostViewer = ({post, error, loading, actionButtons}) => {
    if(error){
        if(error.response && error.response.status === 404){
            return <NotFound></NotFound>
        }
        return <NotFound errorCode={'400'} errorText={'Bad Request'} message={'잘못된 요청입니다'}>{error}</NotFound>
    }

    if(loading || !post) return null

    const {title, body, user, publishedDate, tags} = post

    return (
        <PostViewerBlock>
            <Helmet>
                <title>{user.username} - {title}</title>
            </Helmet>
            <PostHead>
                <h1>{title}</h1>
                <SubInfo hasMarginTop username={user.username} publishedDate={publishedDate}/>
                <Tags tags={tags}/>
            </PostHead>
            {actionButtons}
            <PostContent dangerouslySetInnerHTML={{__html: body}}/>
            <CommentListContainer/>
            <EditorContainer/>
        </PostViewerBlock>
    )
}

export default PostViewer
