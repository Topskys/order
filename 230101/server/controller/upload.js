// const {pushOSS} = require('.././config/oss');
const {responseSelf,fail,exception} =require('../util/response');


//    form-data: file in ctx.req.file
/**
 * 将文件上传ali-oss并返回文件url
 * @param ctx
 * @returns {Promise<void>}
 */
const uploadFile = async ctx => {
    let f_path=ctx.req.file.path
    if (ctx.req.file) {
        try {
            const url= null//pushOSS(ctx.req.file.path)
            responseSelf(ctx,{
                code:200,
                msg: 'success',
                data: {
                    url:url || (ctx.origin + '' + f_path.replace(/[\\\\]/g, '/').replace('public', ''))
                }
            })
        }catch (err){
            exception(ctx,err)
        }
    }else{
        fail(ctx,undefined)
    }
}


module.exports = {uploadFile}
