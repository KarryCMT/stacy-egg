"use strict"

const BaseController = require("./base")
class TopicController extends BaseController {
  // 题目新增
  async add() {
    const { ctx, service } = this
    const body = ctx.request.body
    body.topic_id = Date.now()
    const result = await service.topic.addTopic(body)
    if (result) {
      this.Success({
        message: "新增成功",
      })
    } else {
      this.Error({
        message: "新增失败",
      })
    }
  }
  // 获取题目分页列表
  async page() {
    const { ctx, service } = this
    let params = ctx.request.query
    const data = await service.topic.topicPage(params)
    if (data) {
      this.Success({
        data,
        message: "获取成功",
      })
    } else {
      this.Error({
        message: "获取失败",
      })
    }
  }
  // 获取题目详情信息
  async info() {
    const { ctx, service } = this
    let { id } = ctx.request.query
    const data = await service.topic.getTopicInfo(id)
    if (data) {
      this.Success({
        data,
        message: "获取成功",
      })
    } else {
      this.Error({
        message: "获取失败",
      })
    }
  }
  // 修改题目信息
  async edit() {
    const { ctx, service } = this
    let body = ctx.request.body
    const data = await service.topic.editTopic(body)
    if (data) {
      this.Success({
        data: {},
        message: "修改成功",
      })
    } else {
      this.Error({
        message: "修改失败",
      })
    }
  }

  // 删除题目信息
  async del() {
    const { ctx, service } = this
    let { id } = ctx.request.query
    const data = await service.topic.delTopic(id)
    if (data) {
      this.Success({
        data: {},
        message: "删除成功",
      })
    } else {
      this.Error({
        message: "删除失败",
      })
    }
  }
}

module.exports = TopicController
