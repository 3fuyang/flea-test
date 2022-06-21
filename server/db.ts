import{ createConnection, type ConnectionConfig } from 'mysql'

// 数据库根据实际情况配置
const root: string = 'root'
const db: string = 'flea_test'
const host: string = '127.0.0.1'
const pwd: string = '12345'

const mysql_flea: ConnectionConfig = {
  host: host,
  port: 3306,
  user: root,
  password: pwd,
  database: db,
  //database: 'flea',
  multipleStatements: true,
  // 注意时区的设置
  timezone: '08:00',
  charset: 'utf8mb4'
}

const connection = createConnection(mysql_flea)
connection.connect()

export default connection