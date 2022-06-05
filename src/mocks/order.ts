interface Order {
  gid: string
  price: string
  title: string
  time: string
  status: '待确认' | '已完成' | '待处理' | '已驳回' | '已封禁'
}

const mockGetOrders: Order[] = [
  {
    gid: '0',
    price: '198',
    title: '派克威雅XL系列 樱花粉特别款礼盒',
    time: '2022-05-01 11:46:51',
    status: '待确认'
  },
  {
    gid: '1',
    price: '15',
    title: '大学物理学 (附)网络课程&配套习题',
    time: '2022-04-30 15:56:01',
    status: '已封禁'    
  },
  {
    gid: '2',
    price: '3499',
    title: 'Apple iPad Pro 11英寸平板电脑',
    time: '2022-04-22 15:56:01',
    status: '已驳回'       
  }
]

export { mockGetOrders }