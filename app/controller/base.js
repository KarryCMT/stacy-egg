const Controller = require("egg").Controller
const dayjs = require("dayjs")
class BaseController extends Controller {
  Success(data = {}) {
    const {
      ctx,
      app
    } = this
    ctx.body = {
      code: 200,
      data,
    }
  }
  Error(data = {}) {
    const {
      ctx,
      app
    } = this
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

  createUUID() {
    // Date.now()可以转为8位的36进制字符串，再补充4位的自增id即可
    const INITIAL_COUNTER = 46656; // parseInt('1000', 36); 36进制里的最小4位数对应的10进制数字，最大的4位数为parseInt('zzzz', 36)，即 1679615
    let counter = INITIAL_COUNTER;
    let lastTime = 0;

    return () => {
      const now = Date.now();

      if (now == lastTime) {
        counter++;
      } else {
        counter = INITIAL_COUNTER;
        lastTime = now;
      }

      return `${now.toString(36)}${counter.toString(36)}`;
    }
  }

  // 获取知乎热搜
  async getPacUrl() {
    const uuId = this.createUUID()
    console.log(uuId(),'uuid');
    const {
      ctx
    } = this
    const res = await ctx.curl(
      "https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true", {
        method: "GET",
        dataType: "json",
      }
    )
    let result = res.data
    this.Success({
      result,
      msg: "请求成功"
    })
  }
}

module.exports = BaseController
