const tableConf = {
    t_config: {
        // 边框
        border: true,
        // 序号
        // index: true,
        // 选择
        // checkbox: true,
        // 列表数据
        tableData: [],
        // 列
        columns: [
            {
                type: "text",
                prop: "user_id",
                label: "顾客编号",
            },
            {
                type: "text",
                prop: "phone",
                label: "手机号",
                show_tooltip: false,
            },
            {
                type: "text",
                prop: "title",
                label: "商品标题",
            },
            {
                type: "text",
                prop: "service",
                label: "服务",
                show_tooltip: false,
            },
            {
                type: "text",
                prop: "actual_price",
                label: "支付价格",
            },
            {
                type: "text",
                prop: "pay_type",
                label: "支付方式",
            },
            {
                prop: "work_time",
                label: "上门时间",
                show_tooltip: false,
            },
            {
                type: "text",
                prop: "address",
                label: "上门地址",
            },
            {
                type: "text",
                prop: "remark",
                label: "备注",
            },
            {
                type: "tag",
                prop: "status_text",
                label: "状态",
                cb: (data) => {
                    let tag_type = "default";
                    switch (data.status) {
                        case "待支付":
                            tag_type = "danger";
                            data.status_text = "未支付";
                            break;
                        case "进行中":
                            tag_type = "warning";
                            data.status_text = "待服务";
                            break;
                        case "待评价":
                            tag_type = "info";
                            break;
                        case "完成":
                            tag_type = "success";
                            data.status_text = "完成";
                            break;
                    }
                    return tag_type;
                },
            },
            {
                type: "text",
                prop: "createTime",
                label: "下单时间",
            },
            {
                type: "slot",
                label: "操作",
                prop: "operation",
                slot_name: "operation",
                show_tooltip: false,
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