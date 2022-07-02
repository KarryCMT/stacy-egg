"use strict"

const BaseController = require("./base")
const { sign, verify } = require("jsonwebtoken")
const svgCaptcha = require("svg-captcha")
const bcrypt = require("bcryptjs")

class OrderController extends BaseController {
  // 订单新增
  async add() {
    const { ctx, service } = this
    const body = ctx.request.body
    body.order_id = Date.now()
    const result = await service.order.addOrder(body)
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
  // 获取订单分页列表
  async page() {
    const { ctx, service } = this
    let params = ctx.request.query
    const data = await service.order.orderPage(params)
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
  // 获取订单详情信息
  async info() {
    const { ctx, service } = this
    let { id } = ctx.request.query
    const data = await service.order.getOrderInfo(id)
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
  // 修改订单信息
  async edit() {
    const { ctx, service } = this
    let body = ctx.request.body
    const data = await service.order.editOrder(body)
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
  // 删除订单信息
  async del() {
    const { ctx, service } = this
    let { id } = ctx.request.query
    const data = await service.order.delOrder(id)
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
  // 订单支付
  async pay() {
    const { ctx, service } = this
    let body = ctx.request.body
    const data = await service.order.userPayOrder(body)
    if (data) {
      this.Success({
        data: "ok",
        message: "支付成功",
      })
    } else {
      this.Error({
        message: "支付失败",
      })
    }
  }
}

module.exports = OrderController
