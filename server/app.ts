import express from 'express'
import loginAPI from './routes/login'
import homeAPI from './routes/home'
import detailAPI from './routes/detail'
import orderAPI from './routes/order'
import goodsAPI from './routes/goods'
import reportAPI from './routes/report'
import resetAPI from './routes/reset'

import { AddressInfo } from 'net'

const app = express()

app
  // 配置图片等静态资源  
  .use('/public', express.static('public'))
  .use('/api', loginAPI)
  .use('/api', homeAPI)
  .use('/api', detailAPI)
  .use('/api', orderAPI)
  .use('/api', goodsAPI)
  .use('/api', reportAPI)
  .use('/api', resetAPI)

// 开启服务器
const server = app.listen(8086, () => {
  const host = (server.address() as AddressInfo).address
  const port = (server.address() as AddressInfo).port
  console.log(`Server is running at http://%s:%s`, host, port)
})