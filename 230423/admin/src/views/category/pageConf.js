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
                label: "类别名称",
                show_tooltip: true,
            },
            {
                type: "image",
                prop: "poster",
                label: "海报",
                show_tooltip: true,
            },
            {
                type: "slot",
                label: "操作",
                prop: "operation",
                slot_name: "operation",
                show_tooltip: true,
            },
        ],
        // 分页
        pagination: {
            show: true,
            align: "center",
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