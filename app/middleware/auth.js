const jwt = require("jsonwebtoken")
module.exports = (options) => {
  return async (ctx, next) => {
    let token = ctx.get("X-Token")
    let con = jwt.verify(token, "karry", (err, decoded) => {
      if (err) {
        if (err.name == "TokenExpiredError") {
          //token过期
          let str = {
            iat: 1,
            exp: 0,
            msg: "token过期",
          }
          return str
        } else if (err.name == "JsonWebTokenError") {
          //无效的token
          let str = {
            iat: 1,
            exp: 0,
            msg: "token无效",
          }
          return str
        }
      } else {
        return decoded
      }
    })
    if (con.iat < con.exp) {
       //开始时间小于结束时间，代表token还有效
      await next()
      return true
    } else {
      ctx.body = {
        code:514,
        data:{
          message:'token过期'
        }
      }
      return false
    }
  }
}
