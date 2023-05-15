const tableConf = {
    t_config: {
        // 边框
        border: true,
        // 序号
        index: true,
        // 列表数据
        tableData: [],
        // 列
        columns: [
            {
                type: "text",
                prop: "title",
                label: "标题",
            },
            {
                type: "text",
                prop: "nickName",
                label: "顾客",
            },
            {
                prop: "content",
                label: "评价内容",
                show_tooltip: false,
            },
            {
                type: "text",
                prop: "product_id",
                label: "服务编号",
            },
            {
                type: "function",
                prop: "updatedAt",
                label: "评价时间",
                cb: ({ createdAt }) => {
                    const d = new Date(createdAt).toGMTString();
                    return new Date(d).toLocaleString()
                }
            },
        ],
        // 分页
        pagination: {
            show: true,
            align: "right",
            page: 1,
            pageSize: 10,
            total: 0,
        },
    },
}

export {
    tableConf,
}