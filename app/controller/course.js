"use strict"

const BaseController = require("./base")
class CourseController extends BaseController {
  // 课程新增
  async add() {
    const { ctx, service } = this
    const body = ctx.request.body
    body.course_id = Date.now()
    const result = await service.course.addCourse(body)
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
  // 获取课程分页列表
  async page() {
    const { ctx, service } = this
    let params = ctx.request.query
    const data = await service.course.coursePage(params)
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
  // 获取课程详情信息
  async info() {
    const { ctx, service } = this
    let { id } = ctx.request.query
    const data = await service.course.getCourseInfo(id)
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
  // 修改课程信息
  async edit() {
    const { ctx, service } = this
    let body = ctx.request.body
    const data = await service.course.editCourse(body)
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

  // 删除课程信息
  async del() {
    const { ctx, service } = this
    let { id } = ctx.request.query
    const data = await service.course.delCourse(id)
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

module.exports = CourseController
