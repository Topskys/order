const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'



/**
 * 运行一个微队列任务（模拟微队列）
 * 把传递的函数送进微队列中
 * @param {Function} callback 
 */
function runMicroTask(callback) {
    // 判断node环境
    if (process && process.nextTick) {
        process.nextTick(callback)
    } else if (MutationObserver) {
        // 浏览器环境
        const p = document.createElement('p')
        // 写在<script></script>，是放到微任务中运行
        const observer = new MutationObserver(callback)
        observer.observe('dom', {
            childList: true, // 观察该元素内部变化，就会执行微软任务callback
        })
        p.innerHTML = 'PPP'
    } else {
        setTimeout(callback, 0)
    }
}





/**
 * 手写Promise
 */
class MyPromise {

    /**
     * 创建一个Promise
     * @param {Function} executor 任务执行器，立即执行
     */
    constructor(executor) {
        this._state = PENDING; // state
        this._value = undefined; // data
        this._handlers = []; // 处理函数形成的队列
        try {
            // function.bind(this):让全局this指向当前class 
            executor(this._resolve.bind(this), this._reject.bind(this));
        } catch (error) {
            this._reject(error) // 捕捉错误
        }
    }




    /**
     * 标记当前任务完成
     * @param {any} data 任务完成时相关数据
     */
    _resolve(data) {
        this._changeValueState(FULFILLED, data)
    }


    /**
     * 标记当前任务失败
     * @param {any} reason 任务失败时相关数据
     */
    _reject(reason) {
        this._changeValueState(REJECTED, reason);
    }



    /**
 * 改变状态及数据
 * @param {String} newState 新状态
 * @param {any} value 相关数据
 */
    _changeValueState(newState, value) {
        if (this._state !== PENDING) {
            // 目前状态已经被修改
            return
        }
        this._state = newState;
        this._value = value;
        this._runHandlers(); // 状态变化，执行队列函数
        console.log(newState, value);
    }




    /**
     * 当状态被修改后，才放进微队列和执行onFulfilled, onRejected
     * @param {Function} onFulfilled 
     * @param {Function} onRejected 
     */
    then(onFulfilled, onRejected) {
        // 返回新的Promise
        return new MyPromise((resolve, reject) => {
            // 放进微队列中
            this._pushHandler(onFulfilled, FULFILLED, resolve, reject);
            this._pushHandler(onRejected, REJECTED, resolve, reject);
        })
    }


    /**
 * 向处理队列中添加一个函数
 * @param {Function} executor 添加的数据
 * @param {String} state 什么状态下执行
 * @param {Function} resolve 让then函数返回Promise成功
 * @param {Function} reject 让then函数返回Promise失败
 */
    _pushHandler(executor, state, resolve, reject) {
        this._handlers.push({
            executor,
            state,
            resolve,
            reject,
        })
        console.log(this._handlers)
    }




    runHandler(){}

}


new MyPromise((resolve, reject) => {
    // resolve("1");
    // reject("2");
    // throw new Error("123")
    setTimeout(()=>{resolve(1)},1000)
}).then(() => {
    console.log("data,成功执行")
}, () => {
    console.log("reason,失败执行")
})



// 测试微队列--正确 3 2 1
// setTimeout(() => {
//     console.log(1)
// })
// runMicroTask(()=>{
//     console.log(2)
// })
// console.log(3)






// 图片预加载，第一加载图片会发送图片请求，后面之后都是从缓存获取。
let imgs=["img1"]

let count=0

for (let img in imgs){
    // 图片对象
    const image=new Image()
    image.src=img
    // 给图片增加渲染完成事件，异步
    image.onload=()=>{
        count++
        // 当前渲染图片个数与图片数量相同时，就是所有图片渲染完成
        if(imgs.length===count){
            console.log(count,'所有图片渲染完成')
        }
    }
}
// <img src='img1'>