"use strict"

const BaseController = require("./base")
const dayjs = require("dayjs")
class DynamicController extends BaseController {
  // 新增动态
  async addDynamic() {
    const { ctx, service, app } = this
    const body = ctx.request.body
    const time = new Date()
    body.dynamic_id = Date.now()
    const result = await ctx.service.dynamic.addDynamic(body)
    if (result) {
      this.Success({ result, msg: "发布成功" })
    } else {
      this.Error({ msg: "发布失败" })
    }
  }
  //   获取分页
  async getDynamicList() {
    const { ctx, service } = this
    const query = {
      size: parseInt(ctx.query.size),
      current: parseInt(ctx.query.current),
    }
    const data = await ctx.service.dynamic.getDynamicPage(query)
    if (data) {
      let {rows,count} = data
      rows.map((item) => {
        item.banner_url = item.banner_url.split(",")
      })
      this.Success({ rows,count, msg: "获取成功" })
    } else {
      this.Error({ msg: "获取失败" })
    }
  }

  // 获取详情
  async getDynamicDetail() {
    const { ctx, service } = this
    const id = ctx.query.dynamicid
    const data = await ctx.service.dynamic.getDynamicInfo(id)
    if (data) {
      data.banner_url = data.banner_url.split(",")

      this.Success({ data, msg: "获取成功" })
    } else {
      this.Error({ msg: "获取失败" })
    }
  }

  // 动态点赞 有问题
  async addDynamicLike() {
    const { ctx, service } = this
    const body = ctx.request.body
    const result = await ctx.service.dynamic.addLike(body)
    if (result) {
      this.Success({ result, msg: "点赞成功" })
    } else {
      this.Error({ msg: "点赞失败" })
    }
  }
}

module.exports = DynamicController
