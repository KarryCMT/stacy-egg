"use strict"

const BaseController = require("./base")
class GoodsController extends BaseController {
  // 商品新增
  async add() {
    const { ctx, service } = this
    const body = ctx.request.body
    body.goods_id = Date.now()
    const result = await service.goods.addGoods(body)
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
  // 获取商品分页列表
  async page() {
    const { ctx, service } = this
    let params = ctx.request.query
    const data = await service.goods.goodsPage(params)
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
  // 获取商品详情信息
  async info() {
    const { ctx, service } = this
    let { id } = ctx.request.query
    const data = await service.goods.getGoodsInfo(id)
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
  // 修改商品信息
  async edit() {
    const { ctx, service } = this
    let body = ctx.request.body
    const data = await service.goods.editGoods(body)
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

  // 删除商品信息
  async del() {
    const { ctx, service } = this
    let { id } = ctx.request.query
    const data = await service.goods.delGoods(id)
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

module.exports = GoodsController
