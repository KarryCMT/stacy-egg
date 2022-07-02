"use strict"

const BaseController = require("./base")
const dayjs = require("dayjs")
const uuid = require("uuid")
class RoleController extends BaseController {
  // 角色新增&注册
  async register() {
    const { ctx, service } = this
    const body = ctx.request.body
    body.role_id = Date.now()
    const result = await service.role.addRole(body)
    if (result) {
      this.Success({ message: "新增成功" })
    } else {
      this.Error({ message: "新增失败" })
    }
  }
  // 获取角色分页列表
  async page() {
    const { ctx, service } = this
    let params = ctx.request.query
    const data = await service.role.rolePage(params)
    if (data) {
      this.Success({ data, message: "获取成功" })
    } else {
      this.Error({ message: "获取失败" })
    }
  }
  // 获取角色详情信息
  async info() {
    const { ctx, service } = this
    let { id } = ctx.request.query
    const data = await service.role.roleInfo(id)
    if (data) {
      this.Success({ data, message: "获取成功" })
    } else {
      this.Error({ message: "获取失败" })
    }
  }
  // 修改角色信息
  async edit() {
    const { ctx, service } = this
    let body = ctx.request.body
    const data = await service.role.editRole(body)
    if (data) {
      this.Success({ data: {}, message: "修改成功" })
    } else {
      this.Error({ message: "修改失败" })
    }
  }
  // 删除角色信息
  async del() {
    const { ctx, service } = this
    let {id} = ctx.request.query
    const data = await service.role.delRole(id)
    if (data) {
      this.Success({ data: {}, message: "删除成功" })
    } else {
      this.Error({ message: "删除失败" })
    }
  }
  // 角色分配菜单权限
  async roleMenus(){
    const {ctx,service} = this
    const body = ctx.request.body
    const data = await service.role.setRoleMenus(body)
    if (data) {
      this.Success({data:{},message:'设置成功'})
    }else{
      this.Error({message:'设置失败'})
    }
  }
  // 根据角色ID查对应菜单权限
  async getRoleMenu(){
    const {ctx, service} = this
    const role_id = ctx.request.query
    const data = await service.role.getRoleMenus(role_id)
    if (data) {
      this.Success({data,message:'获取成功'})
    }else{
      this.Error({message:'获取失败'})
    }
  }
}

module.exports = RoleController
