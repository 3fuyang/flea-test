// Detail页面的接口
import express from 'express'
import connection from '../db'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:  false}))

// 重置数据库
app.get('/resetDB', (req, res) => {
  connection.query(
    `update userAccount set available=1;
     update goodInfo set available=1;
     delete from reportData;
     delete from orderData;
    `,
    (err, result) => {
      if (err) throw err
      res.end(JSON.stringify(result))
    }
  )
})

export default app