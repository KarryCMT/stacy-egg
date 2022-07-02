"use strict"

const BaseController = require("./base")
class StudentController extends BaseController {
  // 学生新增
  async add() {
    const { ctx, service } = this
    const body = ctx.request.body
    body.student_id = Date.now()
    const result = await service.student.addStudent(body)
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
  // 获取学生分页列表
  async page() {
    const { ctx, service } = this
    let params = ctx.request.query
    const data = await service.student.studentPage(params)
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
  // 获取学生详情信息
  async info() {
    const { ctx, service } = this
    let { id } = ctx.request.query
    const data = await service.student.getStudentInfo(id)
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
  // 修改学生信息
  async edit() {
    const { ctx, service } = this
    let body = ctx.request.body
    const data = await service.student.editStudent(body)
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

  // 删除学生信息
  async del() {
    const { ctx, service } = this
    let { id } = ctx.request.query
    const data = await service.student.delStudent(id)
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

module.exports = StudentController
