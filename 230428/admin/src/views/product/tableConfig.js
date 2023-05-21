const tableConfig = {
  tableData: [],
  columns: [
    {
      prop: 'title',
      label: '标题',
      show_tooltip: false,
    },
    {
      prop: 'description',
      label: '描述',
      show_tooltip: true,
    },
    {
      type: 'image',
      prop: 'poster',
      label: '海报'
    },
    {
      prop: 'start_price',
      label: '起售价',
      cb:(data)=>{
        if(data.selections.length > 0){
          return `￥${data.selections[0].price}`
        }else{
          return "无"
        }
      },
      show_tooltip: false,
    },
    {
      prop: 'sale_num',
      label: '已预约',
      show_tooltip: false,
    },
     {
      prop: 'class_name',
      label: '类别', // title,
      show_tooltip: false,
    },
    {
      type: 'tag',
      prop: 'status',
      label: '在售',
      cb: ({ status }) => status ? 'success' : 'danger'
    },
    {
      type: 'text',
      prop: 'createdAt',
      label: '创建日期',
      cb: ({ createdAt }) => {
        // 格式化日期，请注意时区(0~8)
        const dt = new Date(createdAt).toGMTString();
        return new Date(dt).toLocaleString().replace(/\//g,'-')
      }
    },
    {
      type: 'slot',
      label: '操作',
      prop: 'operation',
      slot_name: 'operation',
      show_tooltip: false,
    }
  ],
  checkbox: true,
  pagination: {
    show: true,
    page: 1,
    pageSize: 5,
    total: 0,
    align: 'center'
  }
}

export default tableConfig