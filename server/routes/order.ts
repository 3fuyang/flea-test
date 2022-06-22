// Order页面的接口
import express from 'express'
import connection from '../db'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:  false}))

// 获取用户购买商品的订单
app.get('/getOrders/:user_id', (req, res) => {
  let data: any
  const promises: any[] = []
  new Promise((resolve, reject) => {
    connection.query(
      `select * from orderData where buyer=? order by generated_time desc`,
      [req.params.user_id],
      (err, result) => {
        if (err) throw err
        data = JSON.parse(JSON.stringify(result))
        resolve('')
      }
    )
  })
    .then(() => {
      for(let item of data){
        promises.push(
          new Promise((resolve) =>{
            connection.query(
              `select title,price,images,seller_id from goodInfo where good_id = ?`,
              [item.good_id],
              (err, result) => {
                if (err) throw err
                result = JSON.parse(JSON.stringify(result))[0]
                for (let property in result) {
                  item[property] = result[property]
                }
                resolve('')
              }
            )
          })
        )
      }
      Promise.all(promises)
        .then(() => {
          res.end(JSON.stringify(data))
        })
    })  
})

// 确认订单
app.get('/confirmOrder/:oid', (req, res) => {
  connection.query(
    `update orderData set stat='已完成' where order_id=?`,
    req.params.oid,
    (err, result) => {
      if (err) throw err
      res.end(JSON.stringify(result)) 
    }
  )
})

// 举报订单
app.post(`/reportOrder`, (req, res) => {
  const { orderID, reason } = req.body
  connection.query(
    `insert into reportData(order_id, reason, stat) values(?, ?, '待处理');
     update orderData set stat='待处理' where order_id=?`,
     [ orderID, reason, orderID ],
    (err, result) => {
      if (err) throw err
      res.end(JSON.stringify(result))
    }
  )
})

// 修改状态为待处理
app.get('/restartReport/:oid', (req, res) => {
  connection.query(`
    update orderData set stat='待处理' where order_id=?;
    update reportData set stat='待处理' where order_id=?`,
    [req.params.oid, req.params.oid],
    (err, result) => {
      if (err) throw err
      res.end(JSON.stringify(result))
    })
})

export default app