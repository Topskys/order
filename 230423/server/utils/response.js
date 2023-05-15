/**
 * 统一响应模块
 */
class Response {


    success(ctx, data, code = null, msg = '成功') {
        ctx.body = {
            code: code || (data ? 200 : Array.isArray(data) ? 200 : 300),
            msg: msg, 
            data: data
        }
        return
    }


    self(ctx, options) {
        ctx.body = {
            ...options
        }
        return
    }


    fail(ctx, data, code = 300, msg = '失败') {
        ctx.body = {
            code,
            msg,
            err: data
        }
        return
    }


    exception(ctx, err = null, code = 500, msg = '系统出现异常') {
        ctx.body = {
            code,
            msg,
            err
        }
        return
    }

}

module.exports = new Response()
