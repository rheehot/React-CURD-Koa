import Comments from '../../models/comments'
import Post from '../../models/post'
import User from '../../models/user'
import mongoose from 'mongoose'
import Joi from 'joi'
import sanitizeHtml from 'sanitize-html'

const { ObjectId } = mongoose.Types

//ObjectId 검증
export const getCommentById = async (ctx, next) => {
    const { id } = ctx.params
    if (!ObjectId.isValid(id)) {
        ctx.status = 400
        return
    }
    try {
        const comment = await Comments.findById(id)

        if (!comment) {
            ctx.status = 404
            return
        }
        ctx.state.comment = comment
        return comment()
    } catch (e) {
        ctx.throw(500, e)
    }
    return next()
}

//댓글을 작성할 게시물과 유저가 존재하는지 체크
export const checkBoardByPost = async (ctx, next) => {
    const { id } = ctx.params
    const { user } = ctx.state

    if (!ObjectId.isValid(id)) {
        ctx.status = 400
        return
    }

    try {
        const findPost = await Post.findById(id)
        if (!findPost) { //포스트가 존재하지않음
            ctx.status = 404
            return
        }

        const findUser = await User.findByUsername(user.username)
        if (!findUser) { //유저가 존재하지않음
            ctx.status = 403
            return
        }

        ctx.state.post = findPost
        return next()
    } catch (e) {
        throw (500, e)
    }
}

export const list = async ctx => {
    const removeHtmlAndShorten = body => {
        //댓글 데이터를 보내줄때 해당하는 내용으로 필터링을 한 뒤 전송
        const filtered = sanitizeHtml(body, {
            allowedTags: ['img', 'br', 'p'],
            allowedSchemes: ['data', 'http']
        })
        return filtered
    }

    const { id } = ctx.params
    const query = {
        boardId: id,
    }

    try {
        const comments = await Comments.find(query)
            .sort()
            .lean()
            .exec()
        ctx.body = comments.map(comment => ({
            ...comment,
            body: removeHtmlAndShorten(comment.body)
        })
        )
    } catch (e) {
        ctx.throw(500, e)
    }
}

export const write = async ctx => {
    const { id } = ctx.params
    const schema = Joi.object().keys({
        body: Joi.string().required(),
    })

    const isValidComment = schema.validate(ctx.request.body)
    if (isValidComment.error) {
        ctx.status = 400
        ctx.body = isValidComment.error
        return
    }

    const { body } = ctx.request.body
    const comment = new Comments({ boardId: id, body, user: ctx.state.user })
    try {
        await comment.save()
        ctx.body = comment
    } catch (e) {
        ctx.throw(500, e)
    }
}