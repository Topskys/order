const tableConfig = {
  tableData: [],
  columns: [
    {
      type: 'text',
      prop: 'filename',
      label: '文档名称'
    },
    {
      type: 'text',
      prop: 'id',
      label: '产品编号'
    },
    {
      type: 'text',
      prop: 'temperature',
      label: '工作温度'
    },
    {
      type: 'text',
      prop: 'humidity',
      label: '环境湿度'
    },
    {
      type: 'text',
      prop: 'speed',
      label: '喷印速度'
    },
    {
      type: 'tag',
      prop: 'status',
      label: '状态',
      cb: (({ status }) => status == 'normal' ? 'success' : 'info')
    },
    {
      type: 'text',
      prop: 'createdAt',
      label: '创建日期',
      cb: ({ createdAt }) => new Date(createdAt).toLocaleDateString() // 格式化日期，请注意时区(0~8)
    },
    {
      type: 'text',
      prop: 'updatedAt',
      label: '更新日期',
      cb: ({ updatedAt }) => new Date(updatedAt).toLocaleDateString()
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