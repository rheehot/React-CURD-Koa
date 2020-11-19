require('dotenv').config()

import Koa from 'koa'
import Router from 'koa-router'
import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import path from 'path'
import send from 'koa-send'

import jwtMiddleware from './lib/jwtMiddleware'

const app = new Koa()
const router = new Router()

const api = require('./api')

const { PORT, MONGO_URI } = process.env

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})
        .then(() => {
            console.log('Connected to MongoDB')
        })
        .catch(e => {
            console.error(e)
        })

//라우터 설정
router.use('/api', api.routes())

app.use(bodyParser())

//router미들웨어를 적용하기전에 이루어져야 하므로 상단에 위치
app.use(jwtMiddleware)

//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods())

const buildDirectory = path.resolve(__dirname, '../../client/build')

app.use(serve(buildDirectory))
app.use(async ctx => {
    //Not Found이고, 주소가 /api로 시작하지 않는 경우
    if(ctx.status === 404 && ctx.path.indexOf('/api') !== 0){
        await send(ctx, 'index.html', {root: buildDirectory})
    }
})


const port = PORT || 4000
app.listen(port, () => {
    console.log(`Listen to port ${port}`)
})