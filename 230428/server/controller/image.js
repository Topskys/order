const fs = require('fs')
const path = require('path')


const remove = async ctx => {
    let {file = ''} = ctx.request.body
    const dir = `./public/uploads/`

    const readDir = (ctx,dir = '') => {
        return new Promise((resolve, reject) => {
            fs.readdir(dir, (err, files) => {
                if (err) ctx.throw(500, `读取文件异常：${err}`)
                const filePath = path.resolve(`./public/uploads/${file}`)
                if (files.includes(file) && fs.existsSync(filePath)) {
                    console.log('-----------------------DELETE--------------------------')
                    fs.unlink(filePath, (err, res) => {
                        if (err) ctx.throw(500, `删除文件异常：${err}`)
                        resolve(res)
                    })
                } else {
                    ctx.throw(400, `文件不存在`)
                    reject()
                }
            })
        })
    }

    if (file) {
        try {
            const res = await readDir(ctx,dir)
            ctx.body = {
                code: 200,
                msg: "success",
                data:res
            }
        } catch (e) {
            ctx.body = {
                code: 400,
                msg: `failed,err:${e}`
            }
        }
        return
    }

    ctx.body = {
        code: 400,
        msg: "failed"
    }
}

const getAll = async ctx => {
    let {page = 1, pageSize = 10} = ctx.request.query
    page = Number(page)
    pageSize = Number(pageSize)
    const host = "http://localhost:3000"
    const offset = page === 1 ? 0 : (page - 1) * pageSize

    const readDir = (dir = "./public/uploads/") => {
        const arr = []
        return new Promise((resolve, reject) => {
            fs.readdir(dir, (err, files) => {
                if (err) ctx.throw(500, `读取文件异常：${err}`)
                files.forEach(file => arr.push(`${host}/uploads/${file}`))
                resolve(arr)
            })
        })
    }

    const arr = await readDir() || []
    ctx.body = {
        code: 200,
        data: arr.slice(offset, pageSize),
        page,
        pageSize,
        total: arr.length
    }
}

module.exports = {remove, getAll}