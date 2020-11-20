import Router from 'koa-router'
import checkLoggedIn from '../../lib/checkLoggedin'
import * as commentsCtrl from './comments.ctrl'

const comments = new Router()

comments.get('/', commentsCtrl.list)              //전체목록 조회
comments.post('/',checkLoggedIn, commentsCtrl.checkBoardByPost, commentsCtrl.write)            //포스트 작성

const comment = new Router()

comments.use('/:id', comments.routes())
comments.use('/:id', commentsCtrl.getCommentById, comment.routes())
export default comments