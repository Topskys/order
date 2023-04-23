export function keyEvent(key, cb) {
    var e = $.Event('keydown')
    e.keyCode = key
    e.which = key
    $(window).trigger(e);
    cb && cb();
}



/**
 * 防抖
 * @param {Function} func 
 * @param {Number} delay 
 * @returns 
 */
export function debounce(func, delay) {
    let timer=null;
    return function (...args) {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}



/**
 * 节流
 * @param {Function} func 
 * @param {Number} delay 
 * @returns 
 */
export function throttle(func, delay) {
    let lastCallTime = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastCallTime >= delay) {
            func.apply(this, args);
            lastCallTime = now;
        }
    };
}



export const setStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value))


export const getStorage = (key) => JSON.parse(localStorage.getItem(key) || '{}')


export const delStorage = (key) => localStorage.removeItem(key)