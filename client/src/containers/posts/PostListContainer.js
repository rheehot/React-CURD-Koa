import qs from 'qs'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PostList from '../../components/posts/PostList'
import { listPosts } from '../../modules/posts'

const PostListContainers = ({match, location}) => {
    const dispatch = useDispatch()
    const {posts, error, loading, user} = useSelector(({posts, loading, user}) => ({
        posts: posts.posts,
        error: posts.error,
        loading: loading['posts/LIST_POSTS'],
        user: user.user,
    }),
    )

    useEffect(() => {
        const {tag, page} = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        })
        const {username} = match.params

        dispatch(listPosts({tag, username, page}))
    },[dispatch, location.search, match])


    return (
        <PostList loading={loading} error={error} posts={posts} showWriteButton={user}/>
    )
}

export default withRouter(PostListContainers)
