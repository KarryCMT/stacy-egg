"use strict"

const BaseController = require("./base")
class DictItemController extends BaseController {
  // 字典项新增
  async add() {
    const { ctx, service } = this
    const body = ctx.request.body
    body.dict_item_id = Date.now()
    const result = await service.dictItem.addDictItem(body)
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
  // 获取字典项分页列表
  async page() {
    const { ctx, service } = this
    let params = ctx.request.query
    const data = await service.dictItem.dictPage(params)
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
  // 获取字典项详情信息
  async info() {
    const { ctx, service } = this
    let { id } = ctx.request.query
    const data = await service.dictItem.getDictItemInfo(id)
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
  // 修改字典项信息
  async edit() {
    const { ctx, service } = this
    let body = ctx.request.body
    const data = await service.dictItem.editDictItem(body)
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

  // 删除字典项信息
  async del() {
    const { ctx, service } = this
    let { id } = ctx.request.query
    const data = await service.dictItem.delDictItem(id)
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

module.exports = DictItemController
