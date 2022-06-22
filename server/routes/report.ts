// Report页面的接口
import express from 'express'
import connection from '../db'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:  false}))

// 接口1 获取所有举报
app.get('/getAllReport', (req, res) => {
  let data: any
  const promises: any[] = []
  new Promise((resolve, reject) => {
    connection.query(
      `select order_id,reason,stat from reportData`,
      (err, result) => {
        if (err) throw err
        data = JSON.parse(JSON.stringify(result))
        resolve('')
      }
    )
  })
    .then(() => {
      for (let item of data) {
        promises.push(
          new Promise((resolve) =>{
            connection.query(
              `select buyer,seller,good_id from orderData where order_id = ?;
               select title from goodInfo where good_id=(select good_id from orderData where order_id=?)`,
               [item.order_id, item.order_id],
              (err, result) => {
                if(err) throw err
                let raw = JSON.parse(JSON.stringify(result)).flat(2)
                let anotherHalf = Object.assign(raw[0], raw[1])
                for(let property in anotherHalf){
                  item[property] = anotherHalf[property]
                }
                resolve('')
              }
            )
          })
        )
      }
      Promise.all(promises).then(() => {
        res.end(JSON.stringify(data))
      })
    })
})

// 接口2 封禁举报
app.post('/banAccusedUser', (req, res) => {
  connection.query(
    `update userAccount set available=0 where user_id=?;
    update reportData set stat='已封禁' where order_id=?;
    update orderData set stat='已封禁' where order_id=?`,
    [req.body.userID, req.body.orderID, req.body.orderID],
     (err, result) => {
       if (err) throw err
       res.end(JSON.stringify(result))
     }
  )
})

// 接口2 驳回举报
app.post('/rejectReport', (req, res) => {
  connection.query(
    `update reportData set stat='已驳回' where order_id=?;
    update orderData set stat='已驳回' where order_id=?`,
    [req.body.orderID, req.body.orderID],
     (err, result) => {
       if (err) throw err
       res.end(JSON.stringify(result))
     }
  )
})

export default app