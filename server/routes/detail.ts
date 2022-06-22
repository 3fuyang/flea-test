// Detail页面的接口
import express from 'express'
import connection from '../db'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:  false}))

// 接口1 获取所有商品：传入（商品ID） 返回（商品标题、价格、图片url）
app.get('/getGood/:gid', (req, res) => {
  connection.query(
    `select * from goodInfo where good_id=?`,
    req.params.gid,
    (err, result) => {
      if (err) throw err
      res.end(JSON.stringify(JSON.parse(JSON.stringify(result))[0]))
    }
  )
})

// 接口2 购买商品：传入（订单信息） 返回（null）
// 生成订单
app.post(`/generateOrder`, (req, res) => {
  const { buyer, seller, goodID, price, generatedTime, stat } = req.body
  // 向orderData插入新订单，在goodInfo中更新商品为不可访问，从买家的shoppingCart中删除商品
  connection.query(
    `insert into orderData(buyer, seller, good_id, price, generated_time, stat) values (?, ?, ?, ?, ?, ?);
     update goodInfo set available=0 where good_id=?;`,
     [buyer, seller, goodID, price, generatedTime, stat, goodID, goodID, buyer],
    (err, result) => {
      if (err) throw err
      res.end(JSON.stringify(result))
    }
  )
})

export default app