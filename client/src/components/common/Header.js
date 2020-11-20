import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import Responsive from './Responsive';
import { Link } from 'react-router-dom';

const HeaderBlock = styled.div`
	position: fixed;
	width: 100%;
	background: white;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

/**
 * Responsive 컴포넌트의 속성에 스타일 추가
 */

const Wrapper = styled(Responsive)`
	height: 4rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.logo {
		font-size: 1.125rem;
		font-weight: 800;
		letter-spacing: 2px;
	}
	.right {
		display: flex;
		align-items: center;
	}
	.conetent {
		display: flex;
		align-items: left;
	}
`;

const Spacer = styled.div`
	height: 4rem;
`;

const UserInfoBlock = styled.div`
	font-weight: 800;
	margin-right: 1rem;
`;

const UserInfo = ({username}) => {
	return (
		<UserInfoBlock>
			<Link to={'/@' + username}>{username}</Link>
		</UserInfoBlock>
	)
}

const Header = ({user, onLogout}) => {
	return (
		<>
			<HeaderBlock>
				<Wrapper>
					<Link to="/" className="logo">
						MyJunkPage
					</Link>
					{user ? (
						<div className="right">
							<UserInfo username={user.username}>님 반갑습니다.</UserInfo>
                            <Button onClick={onLogout}>로그아웃</Button>
						</div>
					) : (
						<div className="right">
							<Button to="/login">로그인</Button>
						</div>
					)}
				</Wrapper>
			</HeaderBlock>
			<Spacer />
		</>
	);
};

export default Header;
