import Router from 'koa-router'
import checkLoggedIn from '../../lib/checkLoggedin'
import * as postsCtrl from './posts.ctrl'

const posts = new Router()

posts.get('/', postsCtrl.list)              //전체목록 조회
posts.post('/', checkLoggedIn, postsCtrl.write)            //포스트 작성

const post = new Router()

post.get('/', postsCtrl.read)           //포스트 조회 
post.delete('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove)      //포스트 삭제
post.patch('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update)       //포스트 수정

posts.use('/:id', postsCtrl.getPostById, post.routes())

export default posts