// 配置
export const pageConf = {
    // table config
    tableConfig: {
        tableData: [],
        columns: [
            {
                type: "text",
                prop: "product_id",
                label: "商品编号",
            }, {
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
                prop: "star",
                label: "好评率",
                cb: ({ star }) => {
                    let str = '';
                    typeof star != 'number' && (star = Number(star));
                    for (let i = 0; i < star; i++) {
                        str += ' *'
                    }
                    return str
                }
            },
            {
                type: "text",
                prop: "content",
                label: "评价内容",
            },
            {
                type: "tag",
                prop: "status",
                label: "状态",
                cb: (data) => {
                    if (data.star < 2) {
                        return "dander"
                    }
                    if (2 <= data.star && data.star < 3) {
                        return "warning"
                    }
                    if (data.star >= 4) {
                        return "success"
                    }
                },
            },
            {
                type: "text",
                prop: "createdAt",
                label: "日期",
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