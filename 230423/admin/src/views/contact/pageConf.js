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
                prop: "kind",
                label: "留言类型",
            },
            {
                type: "text",
                prop: "content",
                label: "留言内容",
            },
            {
                type: "text",
                prop: "user_id",
                label: "顾客编号",
            },
            {
                prop: "contact_type",
                label: "联系方式",
            },
            {
                type: "function",
                prop: "updatedAt",
                label: "留言时间",
                cb: ({ createdAt }) => {
                    const d = new Date(createdAt).toGMTString();
                    return new Date(d).toLocaleString()
                }
            },
            {
                type: "slot",
                label: "操作",
                prop: "operation",
                slot_name: "operation",
                align: "center",
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