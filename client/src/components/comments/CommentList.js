import React from 'react'
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';

const CommentListBlock = styled(Responsive)`
	margin-top: 3rem;
`;

const CommentItemBlock = styled.div`
    padding-top: 1rem;
    padding-bottom: 1rem;

    &:first-child {
        padding-top: 0;
    }

    & + & {
        border-top: 1px solid ${palette.gray[1]};
    }
 `

const CommentContent = styled.div`
    font-size: 1.25rem;
    color: ${palette.gray[7]};
 `

 const CommentDescribe = styled.div`
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
 `

const CommentItem = ({ comment }) => {
    const { publishedDate, user, body } = comment
    return (
        <CommentItemBlock>
            <SubInfo username={user.username} publishedDate={new Date(publishedDate)} />
            <p dangerouslySetInnerHTML = {{__html: body}}/>
        </CommentItemBlock>
    )
}

const CommentList = ({ comments, loading, error }) => {
    if (error) {
        return <CommentListBlock>에러가 발생하였습니다.</CommentListBlock>
    }

    return (
        <CommentListBlock>
            <CommentContent>
                {!loading && comments && (
                    <div>
                        <CommentDescribe>{comments.length} 개의 덧글</CommentDescribe>
                        {comments.map(comment => (
                            <CommentItem comment={comment} key={comment._id} />
                        ))}
                    </div>
                )}
            </CommentContent>
        </CommentListBlock>
    )
}

export default CommentList
