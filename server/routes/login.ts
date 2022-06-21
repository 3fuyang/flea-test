// Login页面的接口
import express from 'express'
import connection from '../db'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:  false}))

// 接口1 用户登录：传入（账号、密码） 返回（登录结果）
app.post('/userlogin', (req, res) => {
  let doesExist = false
  connection.query(
    `select count(*) as cnt from userAccount where user_id = ? and user_password = ?` ,
    [req.body.id, req.body.password],
    (err, result) => {
      if (err) throw err
      doesExist = (result[0].cnt > 0) ? true : false
      res.end(JSON.stringify(doesExist))
    }
  )
})

// 接口2 管理员登录：传入（账号、密码） 返回（登录结果）
app.post('/adminlogin', (req, res) => {
  let doesExist = false
  connection.query(
    `select count(*) as cnt from adminAccount where user_id = ? and admin_password = ?`, 
    [req.body.id, req.body.password],
    (err, result) => {
      if (err) throw err
      doesExist = (result[0].cnt > 0) ? true : false
      res.end(JSON.stringify(doesExist))
    }
  )
})

export default app