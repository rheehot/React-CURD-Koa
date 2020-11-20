import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const CommentActionButtonsContinerBlock = styled.div`
	margin-top: 1rem;
	margin-bottom: 3rem;
	button + button {
		margin-left: 0.5rem;
	}
`;

const StyledButton = styled(Button)`
    width: 100%;
	height: 2.2125rem;
	& + & {
		margin-left: 0.5rem;
	}
`;

function CommentActionButton({ onPublish, isLogin }) {
	return (
		<CommentActionButtonsContinerBlock>
			{isLogin ?
				<StyledButton cyan onClick={onPublish} >
					댓글작성
				</StyledButton> :
				<StyledButton gray onClick={onPublish} disabled>
				댓글작성
			</StyledButton>
			}
		</CommentActionButtonsContinerBlock>
	);
}

export default CommentActionButton;
