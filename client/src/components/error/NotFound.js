import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

 const NotFoundBlock = styled.div`
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    & {
        background: linear-gradient(45deg,#8500ff,#5acaff);
        height: 100vh;
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 15px 30px rgba(0,0,0,.5);
    }

    .content h2 {
        font-size: 5vw;
        color: #ffffff;
        line-height: 1em;
    }

    .content h4 {
        position: relative;
        font-size: 1.5em;
        margin-bottom: 20px;
        color: #ffffff;
        font-weight: 300;
        padding: 10px 20px;
        display: inline-block;
    }

    .content p {
        color: #ffffff;
        font-size: 1.2em;
    }

    .content a {
        position: relative;
        display: inline-block;
        padding: 10px 25px;
        background: #ff0562;
        color: #ffffff;
        text-decoration: none;
        margin-top: 25px;
        border-raidus: 25px;
        border-bottom: 4px solid #d00d56;
    }

    h2, h4, p {
        transition: .3s;
    }

    h2:hover, h4:hover, p:hover {
        transform: scale(1.05);
        transition: .3s;
    }
 `

 const NotFound = ({errorCode, errorText, message}) => {
    const code = errorCode || '' || '404'
    const title = errorText || '' || 'Not Found'
    const msg = message || '' || '페이지를 찾을 수 없습니다.'
    return (
        <NotFoundBlock>
            <div className='content'>
                <h2>{code + ' ' + title}</h2>
                <p>{ msg }</p>
                <Link to={'/'}>홈</Link>
            </div>
        </NotFoundBlock>
    )
}

export default NotFound
