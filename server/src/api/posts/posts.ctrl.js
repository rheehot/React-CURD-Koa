import Post from '../../models/post'
import mongoose from 'mongoose'
import Joi from 'joi'

const { ObjectId } = mongoose.Types

//DB의 ObjectID검증
//잘못된 ID를 전달했을경우 400Error을 보냄
export const getPostById = async (ctx, next) => {
    const {id } = ctx.params
    if(!ObjectId.isValid(id)) {
        ctx.status = 400
        return
    }
    try{
        const post = await Post.findById(id)
        //포스트가 존재하지않음
        if(!post){
            ctx.status = 404
            return
        }
        ctx.state.post = post
        return next()
    }catch(e){
        ctx.throw(500,e)
    }
}

export const checkOwnPost = (ctx, next) => {
    const { user, post } = ctx.state
    if(post.user._id.toString() !== user._id){
        ctx.status = 403
        return
    }
    return next()
}

/* 포스트 작성
POST /api/posts
{ title, body, [tags] }
*/
export const write = async ctx => {
    //request body => ctx.request.body에서 조회
    const schema = Joi.object().keys({
        //require => 필수항목
        title: Joi.string().required(),
        body: Joi.string().required(),
        tags: Joi.array()
            .items(Joi.string())
            .required()
    })

    const result = schema.validate(ctx.request.body)
    if(result.error) {
        ctx.status = 400
        ctx.body = result.error
        return
    }
    const { title, body, tags } = ctx.request.body
    const post = new Post({ title, body, tags, user: ctx.state.user })
    try {
        await post.save()
        ctx.body = post
    } catch (e) {
        ctx.throw(500, e)
    }
}

/*포스트 목록 조회
GET /api/posts?username=&tag=&page=
*/
export const list = async ctx => {
    const page = parseInt(ctx.query.page || '1', 10)

    if(page < 1) {
        ctx.status = 400
        return
    }

    const { tag, username } = ctx.query
    const query = {
        ...(username ? { 'user.username': username } : {}),
        ...ctx(tag ? {tags: tag} : {}),
    }

    try {
        const posts = await Post.find(query)
                                .sort({_id: -1})
                                .limit(10)
                                .skip((page - 1) * 10)
                                .lean() //데이터를 JSON형식으로 반환
                                .exec()
        const postCount = await Post.countDocuments().exec()
        ctx.set('Last-Page', Math.ceil(postCount / 10))
        //전체 내용 검색할땐 200자로 제한하고 
        //...로 후속 문자열이 있다는것을 알려줌
        ctx.body = posts
            .map(post => ({
                ...post,
                body:
                    post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`
            }))
    }catch(e) {
        ctx.throw(500,e)
    }
}

/*특정 포스트 조회
GET /api/posts/:id
*/
export const read = async ctx => {
    ctx.body = ctx.state.post
}

/* 특정 포스트 제거
    DELETE /api/posts/:id
*/
export const remove = async ctx => {
    //remove() 특정 조건을 만족하는 모든 데이터 삭제
    //findByIdAndRemove() id를 찾아서 지움
    //findOneAndRemove() 특정 조건을 만족하는 데이터하나를 제거

    const { id } = ctx.params
    try {
        await Post.findByIdAndRemove(id).exec()
        ctx.status = 204
    } catch (e) {
        ctx.throw(500, e)
    }

}


/* 포스트 수정(일부)
    PATCH /api/posts/:id
    { title , body, [tags] }
*/
export const update = async ctx => {
    const { id } = ctx.params;

    const schema = Joi.object().keys({
        //require => 필수항목
        title: Joi.string(),
        body: Joi.string(),
        tags: Joi.array()
            .items(Joi.string())
    })

    const result = schema.validate(ctx.request.body)
    if(result.error) {
        ctx.status = 400
        ctx.body = result.error
        return
    }

    try {
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            new: true //업데이트 후의 데이터를 반환
        }).exec()

        if(!post) {
            ctx.status = 404
            return
        }
        ctx.body = post
    }catch(e){
        ctx.throw(500, e)
    }
}