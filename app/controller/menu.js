"use strict"

const BaseController = require("./base")
const dayjs = require("dayjs")
const uuid = require("uuid")

class MenuController extends BaseController {
  // 菜单新增&注册
  async register() {
    const { ctx, service } = this
    const body = ctx.request.body
    body.menu_id = Date.now()
    if(!body.pid){
      body.pid = 0
    }
    const result = await service.menu.addMenu(body)
    if (result) {
      this.Success({ message: "新增成功" })
    } else {
      this.Error({ message: "新增失败" })
    }
  }
  // 获取菜单分页列表
  async page() {
    const { ctx, service } = this
    let params = ctx.request.query
    const data = await service.menu.menuPage(params)
    data.rows.map(item=>{
      item.hidden= item.hidden===1?false:true
      item.alwaysShow= item.alwaysShow===1?true:false
    })
    if (data) {
      this.Success({ data, message: "获取成功" })
    } else {
      this.Error({ message: "获取失败" })
    }
  }
  // 获取菜单详情信息
  async info() {
    const { ctx, service } = this
    let { id } = ctx.request.query
    const data = await service.menu.menuInfo(id)
    if (data) {
      this.Success({ data, message: "获取成功" })
    } else {
      this.Error({ message: "获取失败" })
    }
  }
  // 修改菜单信息
  async edit() {
    const { ctx, service } = this
    let body = ctx.request.body
    const data = await service.menu.editMenu(body)
    if (data) {
      this.Success({ data: {}, message: "修改成功" })
    } else {
      this.Error({ message: "修改失败" })
    }
  }
  // 删除菜单信息
  async del() {
    const { ctx, service } = this
    let {id} = ctx.request.query
    const data = await service.menu.delMenu(id)
    if (data) {
      this.Success({ data: {}, message: "删除成功" })
    } else {
      this.Error({ message: "删除失败" })
    }
  }

  toTree(data) {
    data.forEach((item) => {
      delete item.children
    })
    const map = {}
    data.forEach((item) => {
      item.hidden= item.hidden===1?false:true
      item.alwaysShow= item.alwaysShow===1?true:false
      const rolesArr = item.roles ? item.roles.split(',') : [item.roles]
      Object.assign(item, { meta: {
        title: item.title,
        icon: item.icon,
        roles: rolesArr
      }})
      map[item.id] = item
    })
    const val = []
    data.forEach((item) => {
      const parent = map[item.pid]
      if (parent) {
        (parent.children || (parent.children = [])).push(item)
      } else {
        val.push(item)
      }
    })
    return val
  }
}

module.exports = MenuController
