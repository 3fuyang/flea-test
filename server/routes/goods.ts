// Goods页面的接口
import express from 'express'
import connection from '../db'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:  false}))

// 接口1 获取自己所有的闲置商品
app.get('/getMyGoods/:uid', (req, res) => {
  connection.query(
    `select * from goodInfo where available=1 and seller_id=?`,
    req.params.uid,
    (err, result) => {
      if (err) throw err
      res.end(JSON.stringify(result)) 
    }
  )
})

// 接口2 新增商品
app.post('/addGood', (req, res) => {
  connection.query(
    `insert into goodInfo(seller_id, price, category, title, campus, intro, images)
     value(?, ?, ?, ?, ?, ?, ?)`,
     req.body,
     (err, result) => {
       if(err) throw err
       res.end(JSON.stringify(result))
     }
  )
})

// 接口3 下架商品
app.get('/delGood/:gid', (req, res) => {
  connection.query(
    `delete from goodInfo where good_id=?`,
    req.params.gid,
    (err, result) => {
      if (err) throw err
      res.end(JSON.stringify(result))
    }
  )
})

export default app