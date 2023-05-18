// 配置
export const pageConf = {
    // table config
    tableConfig: {
        tableData: [],
        columns: [
            {
                prop: "title",
                label: "标题",
                show_tooltip: false,
            },
            {
                prop: "money_size",
                label: "金额大小",
                show_tooltip: false,
            },
            {
                prop: "expire",
                label: "逾期时间",
                show_tooltip: false,
            },
            {
                prop: "limit",
                label: "仅限",
                show_tooltip: false,
            },
            {
                prop: "count",
                label: "数量",
                show_tooltip: false,
            },
            // {
            //     type: "tag",
            //     prop: "status",
            //     label: "状态",
            //     cb: ({ status }) => (status === true ? "success" : "warning"),
            // },
            {
                type: "text",
                prop: "updatedAt",
                label: "更新日期",
                cb: ({ updatedAt }) => {
                    const d = new Date(updatedAt).toGMTString();
                    return new Date(d).toLocaleString().replace(/\//g, "-");
                },
            },
            {
                type: "slot",
                label: "操作",
                prop: "operation",
                slot_name: "operation",
              show_tooltip: false,
            },
        ],
        index:true,
        checkbox: true,
        pagination: {
            show: true,
            page: 1,
            pageSize: 10,
            total: 0,
            align: "center",
        },
    }
}