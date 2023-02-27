export function keyEvent(key,cb){
    var e=$.Event('keydown')
    e.keyCode = key
    e.which = key
    $(window).trigger(e);
    cb && cb();
}