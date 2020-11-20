import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo'
import Tags from '../common/Tags'

const PostListBlock = styled(Responsive)`
	margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
	padding-top: 3rem;
	padding-bottom: 3rem;

	&:first-child {
		padding-top: 0;
	}
	& + & {
		border-top: 1px solid ${palette.gray[2]};
	}

	h2 {
		font-size: 2rem;
		margin-bottom: 0;
		maring-top: 0;
		&:hover {
			color: ${palette.gray[6]};
		}
	}
	p {
		margin-top: 2rem;
	}
`;

const PostItem = ({post}) => {
	const {publishedDate, user, tags, title, body, _id} = post
	return (
		<PostItemBlock>
			<Link to={`/@${user.username}/${_id}`}><h2> {title} </h2></Link>
			<SubInfo username={user.username} publishedDate={new Date(publishedDate)}/>
            <Tags tags={tags}/>
			<p>{body}</p>
		</PostItemBlock>
	);
};

const PostList = ({posts, loading, error, showWriteButton}) => {

	if(error) {
		return <PostListBlock>에러가 발생하였습니다.</PostListBlock>
	}

	return (
        <PostListBlock>
            <WritePostButtonWrapper>
				{showWriteButton && (
				<Button cyan to="/write">
                    새 글 작성하기
                </Button>)}
                
            </WritePostButtonWrapper>
			{!loading && posts && (
            <div>
                {posts.map(post => (
					<PostItem post={post} key={post._id}/>
				))}
            </div>
			)}

			
        </PostListBlock>
    )
};

export default PostList;
