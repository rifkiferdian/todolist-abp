require('dotenv').config()

const{
  DB_DIALECT,
  DB_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DBNAME,
  MYSQL_HOST
} = process.env;

module.exports = {
  development: {
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DBNAME,
    host: MYSQL_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT
  },
  test: {
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DBNAME,
    host: MYSQL_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT
  },
  production: {
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DBNAME,
    host: MYSQL_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT
  }
}