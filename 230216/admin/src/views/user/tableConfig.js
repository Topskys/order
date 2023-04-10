/*
 * @Author: Topskys
 * @Date: 2023-04-08 21:43:09
 * @LastEditTime: 2023-04-08 22:07:47
 */
const tableConfig = {
  tableData: [],
  columns: [
    {
      type: 'text',
      prop: 'username',
      label: '账号'
    },
    {
      type: 'text',
      prop: 'password',
      label: '密码'
    },
    {
      type: 'text',
      prop: 'phone',
      label: '手机',
      cb: (({ phone }) => phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'))
    },
    {
      type: 'text',
      prop: 'nickname',
      label: '昵称'
    },
    {
      type: 'text',
      prop: 'gender',
      label: '性别'
    },
    {
      type: 'tag',
      prop: 'status',
      label: '状态',
      cb:(({status})=>status?'success':'error')
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