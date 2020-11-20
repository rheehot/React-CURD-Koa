import React from 'react'
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components'
import palette from '../../lib/styles/palette'

const StyledPageNumber = styled.div`
	padding: 0.125rem 0.5rem 0 0.5rem;
	
	${props => 
		props.currentPage && 
			css`
				font-weight: bold;
			`}
	&:hover {
		color: ${palette.cyan[6]};
		border: 1px solid ${palette.gray[3]};
	}
`;

 const PageNumber = ({to, history, ...rest}) => {
    
	const onClick = e => {
		if(to) {
			history.push(to)
		}
		if(rest.onClick) {
			rest.onClick(e)
		}
	}

	return <StyledPageNumber {...rest} onClick={onClick}/>
}

export default withRouter(PageNumber)
