// Home页面的接口
import express from 'express'
import connection from '../db'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:  false}))

// 接口1 获取所有商品：传入（商品ID） 返回（商品标题、价格、图片url）
app.get('/getAll', (req, res) => {
  connection.query(
    `select * from goodInfo where available=1`,
    (err, result) => {
      if (err) throw err
      res.end(JSON.stringify(result)) 
    }
  )
})

export default app