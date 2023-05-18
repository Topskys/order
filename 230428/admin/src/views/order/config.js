// 配置
export const pageConf = {
    // table config
    tableConfig: {
        tableData: [],
        columns: [
            {
                prop: "nickName",
                label: "顾客",
                show_tooltip: false,
            },
            {
                prop: "phone",
                label: "手机号",
                show_tooltip: false,
            },
            {
                type: "image",
                prop: "poster",
                label: "海报",
            },
            {
                prop: "service",
                label: "维修服务",
                show_tooltip: false,
            },
            {
                prop: "price",
                label: "价格",
                cb: ({ price }) => `￥${price}`,
                show_tooltip: false,
            },
            {
                prop: "actual_pay",
                label: "实付款",
                cb: ({ actual_pay }) => actual_pay ? `￥${actual_pay}` : '待付款',
                show_tooltip: false,
            },
            {
                type: "function",
                prop: "address",
                label: "地址",
                cb: ({ address }) =>
                    `<a href='https://www.amap.com/search?query=${address}' target='_blank' class='a-hover'>${address}</a>`,
                show_tooltip: false,
            },
            {
                prop: "work_date",
                label: "服务日期",
                show_tooltip: false,
            },
            {
                prop: "remark",
                label: "备注",
                width: 50,
                cb: ({ remark }) => remark || '无',
                show_tooltip: false,
            },
            {
                type: "tag",
                prop: "status",
                label: "状态",
                cb: (status) => {
                    let type="primary"
                    if (status == '待上门') {
                        type="danger"
                    }
                    if (status == '服务中') {
                        type = "warning"
                    }
                    if (status == '完成') {
                        type = "success"
                    }
                    return type
                }
            },
            {
                prop: "createdAt",
                label: "下单时间",
                cb: ({ createdAt }) => {
                    const d = new Date(createdAt).toGMTString();
                    return new Date(d).toLocaleString().replace(/\//g, "-");
                },
                show_tooltip: false,
            },
            {
                type: "slot",
                label: "操作",
                prop: "operation",
                slot_name: "operation",
                show_tooltip: false,
            },
        ],
        checkbox: true,
        pagination: {
            show: true,
            page: 1,
            pageSize: 5,
            total: 0,
            align: "left",
        },
    }
}