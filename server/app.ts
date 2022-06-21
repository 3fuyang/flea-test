import express from 'express'
import loginAPI from './routes/login'
import homeAPI from './routes/home'

import { AddressInfo } from 'net'

const app = express()

app
  // 配置图片等静态资源  
  .use('/public', express.static('public'))
  .use('/api', loginAPI)
  .use('/api', homeAPI)

// 开启服务器
const server = app.listen(8082, () => {
  const host = (server.address() as AddressInfo).address
  const port = (server.address() as AddressInfo).port
  console.log(`Server is running at http://%s:%s`, host, port)
})