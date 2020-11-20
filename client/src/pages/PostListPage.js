import React from 'react'
import HeaderContainer from '../components/common/HeaderContainer'
import PaginationContainer from '../containers/posts/PaginationContainer'
import PostListContainer from '../containers/posts/PostListContainer'

function PostListPage() {
    return (
        <>
        <HeaderContainer />
        <PostListContainer/>
        <PaginationContainer />
        </>
    )
}

export default PostListPage
