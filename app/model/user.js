const bcrypt = require('bcryptjs')
module.exports = (app) => {
  const { STRING, INTEGER,DOUBLE, TEXT, DATE } = app.Sequelize
  const User = app.model.define("user", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    user_name: STRING(20),
    user_id: { type: STRING(50), unique: true },
    encrypt: { type: STRING(64) },
    role_id: { type: INTEGER, unique: true },
    password: {
      type: STRING(64),
      set(val) {
        // 生成盐
        const salt = bcrypt.genSaltSync(10)
        // 给密码加盐hashSync(原密码,salt)
        const psw = bcrypt.hashSync(val, salt)
        // 保存到数据库
        this.setDataValue("password", psw)
      },
    },
    avatar: TEXT("long"),
    introduction: STRING(100),
    nick_name:STRING(255),
    balance:DOUBLE,
    phone: STRING(20),
    roles: STRING(20),
    openid: STRING(255),
    avatar_url: STRING(200),
    gender: INTEGER,
  })

  return User
}
