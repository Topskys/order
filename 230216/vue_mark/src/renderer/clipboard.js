/*
 * @Author: Topskys
 * @Date: 2023-02-24 19:56:18
 * @LastEditTime: 2023-03-14 23:23:24
 */
const clipboard = navigator.clipboard;



export function copy(e) {
    let data = null
    if (window.getSelection) {
        data = window.getSelection().toString()
    } else if (document.selection) {
        data = document.selection.createRange(); // IE、Opera
    }

    e.clipboardData.setData("Text", data)
}


export function paste(e, node) {
    let data = (e.clipboardData && e.clipboardData.items) || []
    let dom = document.querySelector(node)

    data.forEach(o => {
        if (o.kind == 'string' && o.type.match('^text/plain')) { }
        else if (o.kind == 'string' && o.type.match('^text/html')) {
            o.getAsString(function (str) {
                dom.innerHTML = str
            })
        } else if (o.kind == 'string' && o.type.match('^text/url-list')) {

        } else if (o.kind == 'file' && o.type.match('^image/')) {

        }
    });
}




