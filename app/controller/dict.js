"use strict"

const BaseController = require("./base")
class DictController extends BaseController {
  // 字典新增
  async add() {
    const { ctx, service } = this
    const body = ctx.request.body
    body.dict_id = Date.now()
    const result = await service.dict.addDict(body)
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
  // 获取字典分页列表
  async page() {
    const { ctx, service } = this
    let params = ctx.request.query
    const data = await service.dict.dictPage(params)
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
  // 获取字典详情信息
  async info() {
    const { ctx, service } = this
    let { id } = ctx.request.query
    const data = await service.dict.getDictInfo(id)
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
  // 修改字典信息
  async edit() {
    const { ctx, service } = this
    let body = ctx.request.body
    const data = await service.dict.editDict(body)
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

  // 删除字典信息
  async del() {
    const { ctx, service } = this
    let { id } = ctx.request.query
    const data = await service.dict.delDict(id)
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

  // 字典选择器
  async postDictSelector() {
    const { ctx, service } = this
    let { code } = ctx.request.body
    const data = await service.dict.getDictionarySelector(code)
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
}

module.exports = DictController
