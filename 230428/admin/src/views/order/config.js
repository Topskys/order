// 配置
export const pageConf = {
    // table config
    tableConfig: {
        tableData: [],
        columns: [
            {
                prop: "nickName",
                label: "顾客",
            },
            {
                prop: "phone",
                label: "手机号",
            },
            {
                type: "image",
                prop:"poster",
                label: "海报",
            },
            {
                prop: "service",
                label: "维修服务",
            },
            {
                prop: "price",
                label: "价格",
                cb:({price})=>`￥${price}`
            },
            {
                prop: "actual_pay",
                label: "实付款",
                cb:({actual_pay})=>actual_pay?`￥${actual_pay}`:'待付款'
            },
            {
                type: "function",
                prop: "address",
                label: "地址",
                cb: ({ address }) =>
                    `<a href='https://www.amap.com/search?query=${address}' target='_blank' class='a-hover'>${address}</a>`,
            },
            {
                prop: "work_date",
                label: "上门日期",
            },
            {
                prop: "remark",
                label: "备注",
                width:50,
                cb:({remark})=>remark||'无'
            },
            {
                type: "tag",
                prop: "status",
                label: "状态", },
            {
                prop: "createdAt",
                label: "下单时间",
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
                align: "center",
            },
        ],
        checkbox: true,
        pagination: {
            show: true,
            page: 1,
            pageSize: 10,
            total: 0,
            align: "left",
        },
    }
}