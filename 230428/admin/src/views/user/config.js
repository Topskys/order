// 配置
export const pageConf = {
    // table config
    tableConfig: {
        tableData: [],
        columns: [
            {
                type: "text",
                prop: "username",
                label: "账号",
                show_tooltip: false,
            },
            {
                type: "text",
                prop: "nickName",
                label: "昵称",
            },
            {
                type: "image",
                prop: "avatarUrl",
                label: "头像",
            },
            {
                type: "text",
                prop: "phone",
                label: "手机号",
                show_tooltip: false,
            },
            {
                type: "function",
                prop: "city",
                label: "城市",
                cb: ({ city }) =>
                    `<a href='https://www.amap.com/search?query=${city}' target='_blank' >${city}</a>`,
            },
            {
                type: "function",
                prop: "address",
                label: "地址",
                cb: ({ address }) =>
                    `<a href='https://www.amap.com/search?query=${address}' target='_blank' class='a-hover'>${address}</a>`,
                show_tooltip: false, },
            {
                type: "text",
                prop: "like",
                label: "关注数量",
                cb: data => data.like || 0
            },
            {
                type: "text",
                prop: "discount",
                label: "红包数量",
                cb: ({ discount }) => discount.length || 0,
            },
            {
                type: "tag",
                prop: "status",
                label: "状态",
                cb: (data) => {
                    let type 
                    if ((typeof data.status == 'boolean' && data.status ==true) || data.status=="正常") {
                        data.status = "正常"
                        type = "success"
                    }else{
                        data.status = "异常"
                        type = "danger"
                    }
                    return type
                },
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