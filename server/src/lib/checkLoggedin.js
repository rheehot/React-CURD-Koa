const checkLoggedIn = (ctx, next) => {
    if(!ctx.state.user){
        ctx.status = 401 // 인증안됨
        return
    }
    return next()
}


export default checkLoggedIn