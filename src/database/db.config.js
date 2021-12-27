require("dotenv").config();

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PW, // mysql 초기 설정한 비밀번호
  DB: process.env.DB_NAME,
  dialect: process.env.DB_TYPE,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};