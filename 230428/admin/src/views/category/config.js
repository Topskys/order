// 配置
export const pageConf = {
    // table config
    tableConfig: {
        tableData: [],
        columns: [
            {
                prop: "name",
                label: "类别名称",
                show_tooltip: false,
            },
            {
                type: "image",
                prop: "poster",
                label: "海报",
            },
            {
                type: "text",
                prop: "_id",
                label: "类别编号",
            },
            // {
            //     type: "tag",
            //     prop: "status",
            //     label: "状态",
            //     cb: (data) => {
            //         let type 
            //         if ((typeof data.status == 'boolean' && data.status ==true) || data.status=="正常") {
            //             data.status = "正常"
            //             type = "success"
            //         }else{
            //             data.status = "异常"
            //             type = "danger"
            //         }
            //         return type
            //     },
            // },
            {
                type: "text",
                prop: "createdAt",
                label: "创建日期",
                cb: ({ updatedAt }) => {
                    const d = new Date(updatedAt).toGMTString();
                    return new Date(d).toLocaleString().replace(/\//g, "-");
                },
                show_tooltip: false,
            },
            {
                type: "text",
                prop: "updatedAt",
                label: "更新日期",
                cb: ({ updatedAt }) => {
                    const d = new Date(updatedAt).toGMTString();
                    return new Date(d).toLocaleString().replace(/\//g, "-");
                },
                show_tooltip: false,
            },
            {
                type: "slot",
                label: "操作",
                prop: "operation",
                slot_name: "operation",
                show_tooltip:false,
            },
        ],
        index:true,
        // checkbox: true,
        pagination: {
            show: false,
            page: 1,
            pageSize: 10,
            total: 0,
            align: "center",
        },
    }
}