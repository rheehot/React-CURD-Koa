import React from 'react';
import styled from 'styled-components';
import qs from 'qs';
import Button from '../common/Button';
import PageNumber from '../common/PageNumber';


const PaginationBlock = styled.div`
	width: 320px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	margin-bottom: 3rem;
`;

const buildLink = ({ username, tag, page }) => {
	const query = qs.stringify({ tag, page });
	return username ? `/@${username}?${query}` : `/?${query}`;
};

const Pagination = ({ page, tag, username, lastPage }) => {
	return (
		<PaginationBlock>
			<Button
				disabled={page === 1}
				to={
					page === 1
						? undefined
						: buildLink({ username, tag, page: page - 1 })
				}
			>
				이전
			</Button>
			{/*
				* 만약 10개를 한묶음으로 한다면?
				 * 반복문을 어떻게 써야할까
				 * 1. 1~10까지의 배열을만들어 map을사용
			 */
			}
			{
				[...Array(5)].map((n, index) => {
					const pagination = Math.ceil(page / 5) - 1
					const pageIndex = index + (pagination * 5) + 1
					return (
						pageIndex <= lastPage && pageIndex > 0?
							pageIndex === page ? 
								<PageNumber currentPage key={pageIndex}>{pageIndex}</PageNumber>
								:
								<PageNumber to={buildLink({ username, tag, page: pageIndex})} key={pageIndex}>{pageIndex}</PageNumber>
							:
							undefined
						)
				}

				)
			}
			<Button
				disabled={page >= lastPage}
				to={
					page === lastPage
						? undefined
						: buildLink({ username, tag, page: page + 1 })
				}
			>
				다음
			</Button>
		</PaginationBlock>
	);
};

export default Pagination;
