const Controller = require("egg").Controller
const dayjs = require("dayjs")
class BaseController extends Controller {
  Success(data = {}) {
    const { ctx, app } = this
    ctx.body = {
      code: 200,
      data,
    }
  }
  Error(data = {}) {
    const { ctx, app } = this
    ctx.body = {
      code: 500,
      data,
    }
  }
  //创建时间
  CreateDateTime() {
    return `${dayjs().year()}-${dayjs().month()}-${dayjs().date()} ${dayjs().hour()}:${dayjs().minute()}:${dayjs().second()}`
  }
  // 随机生成32位字符串
  randomString() {
    let len = 6
    let $chars = "abcdefhijkmnprstwxyz2345678"
    let maxPos = $chars.length
    let pwd = ""
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos + Date.now()))
    }
    return pwd
  }

  // 获取知乎热搜
  async getPacUrl() {
    const { ctx } = this
    const res = await ctx.curl(
      "https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true",
      {
        method: "GET",
        dataType: "json",
      }
    )
    let result = res.data
    this.Success({ result, msg: "请求成功" })
  }
}

module.exports = BaseController
