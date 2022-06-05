interface Report {
  time: string
  no: string
  orderID: string
  buyerID: string
  sellerID: string
  status: '待处理' | '已封禁' | '已驳回',
}

const mockGetReports: Report[] = [
  {
    time: '2022/5/2',
    no: '1',
    orderID: '1',
    buyerID: '1951001',
    sellerID: '1951002',
    status: '待处理',
  },
  {
    time: '2022/5/4',
    no: '2',
    orderID: '2',
    buyerID: '1951004',
    sellerID: '1951003',
    status: '已封禁',
  },
  {
    time: '2022/5/15',
    no: '3',
    orderID: '3',
    buyerID: '1821504',
    sellerID: '2005151',
    status: '已驳回',
  },
  {
    time: '2022/5/15',
    no: '4',
    orderID: '4',
    buyerID: '1821504',
    sellerID: '2005151',
    status: '待处理',
  }  
]

export { mockGetReports }