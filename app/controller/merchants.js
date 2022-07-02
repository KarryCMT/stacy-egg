"use strict"
const BaseController = require("./base")
class MerchantsController extends BaseController {
  // 商户新增
  async add() {
    const {
      ctx,
      service
    } = this
    const body = ctx.request.body
    const result = await service.merchants.addMerchants(body)
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
  // 获取商户分页列表
  async page() {
    const {
      ctx,
      service
    } = this
    let params = ctx.request.query
    const data = await service.merchants.merchantsPage(params)
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
  // 获取商户详情信息
  async info() {
    const {
      ctx,
      service
    } = this
    let {
      merchants_id
    } = ctx.request.body
    const data = await service.merchants.getMerchantsInfo(merchants_id)
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
  // 修改商户信息
  async edit() {
    const {
      ctx,
      service
    } = this
    let body = ctx.request.body
    const data = await service.merchants.editMerchants(body)
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

  // 删除商户信息
  async del() {
    const {
      ctx,
      service
    } = this
    let {
      id
    } = ctx.request.query
    const data = await service.merchants.delMerchants(id)
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
  // 查询当前用户位置附近的商户
  async getNearPage() {
    const {
      ctx,
      service
    } = this
    let {
      longitude,
      latitude
    } = ctx.request.body
    const data = await service.merchants.getNearMerchantsPage({
      longitude,
      latitude
    })
    if (data) {
      this.Success({
        list:data,
        message: "获取成功",
      })
    } else {
      this.Error({
        message: "获取失败",
      })
    }
  }
}

module.exports = MerchantsController
