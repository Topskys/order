/**
 * 格式化时间日期
 * @param time
 * @param format
 */
function dateTimeFormat(time=Date.now(),format="YYYY-MM-DD"){
    let [dt,res] = [new Date(time),time]
    let [y,m,d,hh,mm,ss] = [dt.getFullYear(), (dt.getMonth()+1)<10?`0${dt.getMonth()+1}`:dt.getMonth()+1, dt.getDate()<10?`0${dt.getDate()}`:dt.getDate(), dt.getHours()<10?`0${dt.getHours()}`:dt.getHours(), dt.getMinutes()<10?`0${dt.getMinutes()}`:dt.getMinutes(), dt.getSeconds<10?`0${dt.getSeconds()}`:dt.getSeconds()]
    let formats=[
        {
            key: "YYYY-MM-DD hh:mm:ss",
            value:`${y}-${m}-${d} ${hh}:${mm}:${ss}`
        },
        {
            key: "YYYY-MM-DD",
            value: `${y}-${m}-${d}`
        },
        {
            key: "YYYY/MM/DD",
            value: `${y}/${m}/${d}`
        },
        {
            key: "YYYY年MM月DD日",
            value: `${y}年${m}月${d}日`
        },
        {
            key: "YYYY年MM月DD日 hh时mm分ss秒",
            value: `${y}年${m}月${d}日 ${hh}时${mm}分${ss}秒`
        }
    ]
    formats.forEach(f=>f.key===format && (res=f.value||time))
    return res
}




module.exports=dateTimeFormat
