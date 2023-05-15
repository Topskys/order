/**
 * 统一响应类
 * 多行注释快捷键
 * ctrl+shift+/
 * 格式化快捷键
 * Ctrl+Alt+L
 */
class Response {


    success(ctx, data, code = null, msg='成功' ) {
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
