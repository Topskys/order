// 配置
export const pageConf = {
    // table config
    tableConfig: {
        tableData: [],
        columns: [
            {
                prop: "star",
                label: "好评率",
                cb: (data) => {
                    typeof data.star != 'number' && (data.star = Number(data.star));
                    let str=''
                    const len = data.star||0
                    for (let i = 0; i < len; i++) {
                        str += '*'
                    }
                    return str
                }
            },
            {
                type: "text",
                prop: "content",
                label: "评价内容",
                show_tooltip:false,
            },
            {
                type: "text",
                prop: "product_id",
                label: "商品编号",
            },
            {
                type: "text",
                prop: "service",
                label: "服务内容"
            },
            {
                type: "text",
                prop: "nickName",
                label: "顾客",
            },
            {
                type: "text",
                prop: "createdAt",
                label: "评论日期",
                cb: ({ createdAt }) => {
                    const d = new Date(createdAt).toGMTString();
                    return new Date(d).toLocaleString().replace(/\//g, "-");
                },
            },
            {
                type: "slot",
                label: "操作",
                prop: "operation",
                slot_name: "operation",
                align: "left",
            },
        ],
        index:true,
        checkbox: true,
        pagination: {
            show: true,
            page: 1,
            pageSize: 10,
            total: 0,
            align: "right",
        },
    }
}