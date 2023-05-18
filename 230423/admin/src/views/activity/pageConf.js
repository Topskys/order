const tableConf = {
    t_config: {
        // 边框
        border: true,
        // 序号
        index: false,
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
                prop: "discount",
                label: "卷面大小",
                cb: data => data.discount ? `${data.discount}元` : 0, // function name (data){return } // data.dis + 'yaun'
            },
            {
                prop: "count",
                label: "剩余数量",
            },
            {
                type: "text",
                prop: "end_time",
                label: "有效期",
            },
            {
                type: "text",
                prop: "up_size",
                label: "满减可用",
            },
            {
                type: "function",
                prop: "updatedAt",
                label: "创建时间",
                cb: ({ createdAt }) => {
                    const d = new Date(createdAt).toGMTString();
                    return new Date(d).toLocaleString()
                }
            },
            // {
            //     type: "function",
            //     prop: "updatedAt",
            //     label: "更新时间",
            //     cb: ({ updatedAt }) => {
            //         const d = new Date(updatedAt).toGMTString();
            //         return new Date(d).toLocaleString()
            //     }
            // },
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

    // Dialog 表单
    dialogVisible: false,
    f_field: {},
    imgList: [],
}

export {
    tableConf,
}