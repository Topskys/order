// 配置
export const pageConf = {
    // table config
    tableConfig: {
        tableData: [],
        columns: [
            {
                prop: "name",
                label: "姓名",
                show_tooltip: false,
            },
            {
                prop: "is_allow",
                label: "资格认证",
                show_tooltip: false,
                cb:({is_allow})=>is_allow==true?'通过':'异常'
            },
            {
                type: "text",
                prop: "phone",
                label: "手机号",
                show_tooltip: false,
            },
            {
                prop: "work_year",
                label: "行业经验"
            },
            {
                prop: "skill",
                label: "技能",
                show_tooltip: false,
            },
            {
                prop: "region",
                label: "区域",
            },
            // {
            //     type: "image",
            //     prop: "avatarUrl",
            //     label: "头像",
            // },
            {
                prop: "age",
                label: "年龄",
                cb: ({ age }) => `${age}岁`
            },
            {
                type: "tag",
                prop: "status",
                label: "在职",
                cb: (data) => data.status == '否'?"warning":"primary" ,
            },
            {
                type: "text",
                prop: "createdAt",
                label: "入职日期",
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
                show_tooltip: false,
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