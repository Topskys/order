const tableConfig = {
  tableData: [{subject:'1',contact:'2',content:"3"}],
  columns: [
    {
      type: 'text',
      prop: 'contact',
      label: '联系方式'
    },
    {
      type: 'text',
      prop: 'subject',
      label: '主题'
    },
    {
      type: 'text',
      prop: 'content',
      label: '反馈内容'
    },
    {
      type: 'text',
      prop: 'createdAt',
      label: '创建日期',
      cb: ({ createdAt }) => {
        const time=new Date(createdAt).getTime();
        return new Date(time).toLocaleString()
      } // 格式化日期，请注意时区(0~8)
    },
    // {
    //   type: 'text',
    //   prop: 'updatedAt',
    //   label: '更新日期',
    //   cb: ({ updatedAt }) => new Date(updatedAt).toLocaleDateString()
    // },
    {
      type: 'slot',
      label: '操作',
      prop: 'operation',
      slot_name: 'operation',
      align: 'center'
    }
  ],
  checkbox: true,
  index:true,
  pagination: {
    show: true,
    page: 1,
    pageSize: 10,
    total: 0,
    align:'right'
  }
}

export default tableConfig