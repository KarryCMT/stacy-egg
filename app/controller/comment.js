"use strict"

const BaseController = require("./base")
class CommentController extends BaseController {
  // 新增评论
  async addComment() {
    const { ctx, service, app } = this
    const body = ctx.request.body
    body.comment_id = Date.now()
    body.createTime = Date.now()
    const result = await ctx.service.comment.addComment(body)
    if (result) {
      await ctx.service.comment.addDynamicCommentNumber({
        dynamic_id: body.dynamic_id,
        comment: body.comment,
      })
      this.Success({ result, msg: "评论成功" })
    } else {
      this.Error({ msg: "评论失败" })
    }
  }
  // 获取评论分页
  async getCommentList() {
    const { ctx, service } = this
    let id = ctx.query.dynamicid
    // const query = {
    //   id:ctx.query.dynamicid,
    //   // size: parseInt(ctx.query.size),
    //   // current: parseInt(ctx.query.current),
    // }
    const result = await ctx.service.comment.getCommentPage(id)
    if (result) {
      // result.map((item) => {
      //   item.publicTime = dayjs(item.publicTime).format("YYYY-MM-DD HH:mm:ss")
      //   item.banner_url = item.banner_url.split(",")
      // })
      this.Success({ result, msg: "获取成功" })
    } else {
      this.Error({ msg: "获取失败" })
    }
  }

  // 获取评论详情
  async getCommentDetail() {
    const { ctx, service } = this
    const id = ctx.query.dynamicid
    const result = await ctx.service.dynamic.getDynamicInfo(id)
    if (result) {
      this.Success({ result, msg: "获取成功" })
    } else {
      this.Error({ msg: "获取失败" })
    }
  }
}

module.exports = CommentController
