/*
* 统一响应模块
* 多行注释快捷键
* ctrl+shift+/
* 格式化快捷键
* Ctrl+Alt+L
*/

const success = (ctx, data, code, msg=null) => {
    ctx.body = {
        code: code || (data ? 200 : Array.isArray(data)?200:300),
        msg:  data ? msg?msg:'成功' : '失败',
        data
    }
}


const responseSelf = (ctx, options) => {
    ctx.body = {
        ...options
    }
}


const fail = (ctx, data, code = 300, msg = '失败') => {
    ctx.body = {
        code,
        msg,
        err: data
    }
}


const exception = (ctx, err = null, code = 500, msg = '系统出现异常') => {
    ctx.body = {
        code,
        msg,
        err
    }
}


module.exports = {
    success,
    responseSelf,
    fail,
    exception,
}
