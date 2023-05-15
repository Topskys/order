const tableConfig = {
  tableData: [],
  columns: [
    {
      prop: 'title',
      label: '标题'
    },
    {
      prop: 'description',
      label: '描述'
    },
    {
      type: 'image',
      prop: 'poster',
      label: '海报'
    },
    {
      prop: 'start_price',
      label: '起售价',
      cb:({start_price})=>start_price?`￥${start_price}`:''
    },
    {
      prop: 'sale_num',
      label: '已预约'
    },
     {
      prop: 'class_id',
      label: '类别编号' // title
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
      align: 'center'
    }
  ],
  checkbox: true,
  pagination: {
    show: true,
    page: 1,
    pageSize: 10,
    total: 0,
    align: 'right'
  }
}

export default tableConfig