const { Service } = require("egg")
class CourseService extends Service {
  //新增课程信息
  async addCourse(params) {
    console.log('新增课程信息',params);
    if (!params.cover) {
      params.cover = 'https://iconfont.alicdn.com/t/ce99661e-151d-4341-9099-833a9fb62f5c.jpg'
    }
    try {
      const { ctx } = this
      const result = await ctx.model.Course.create(params)
      return result
    } catch (error) {
      return null
    }
  }
  // 获取课程分页信息
  async coursePage(params) {
    let { pageIndex, pageSize, userId } = params
    try {
      const { ctx } = this
      let where = {}
      if (userId) {
        where = {
          user_id: parseInt(userId),
        }
      }
      const result = await ctx.model.Course.findAndCountAll({
        attributes: [
          "id",
          "course_id",
          "user_id",
          "name",
          "remark",
        ],
        where,
        order: [["id", "DESC"]],
        limit: parseInt(pageSize), // 每页多少条
        offset: parseInt(pageSize) * (parseInt(pageIndex) - 1), // 跳过多少条
      })

      return result
    } catch (error) {
      return null
    }
  }
  async getCourseInfo(id) {
    try {
      const { ctx } = this
      const result = await ctx.model.Course.findOne({
        attributes: [
          "id",
          "course_id",
          "user_id",
          "name",
          "remark",
        ],
        where: {
          course_id: id,
        },
      })
      return result
    } catch (error) {
      return null
    }
  }
  // 修改
  async editCourse(data) {
    let { course_id } = data
    try {
      const { ctx } = this
      const result = await ctx.model.Course.update(
        { ...data },
        {
          where: {
            course_id,
          },
        }
      )
      return result
    } catch (error) {
      return null
    }
  }
  // 删除
  async delCourse(id) {
    try {
      const { ctx } = this
      const result = await ctx.model.Course.destroy({
        where: {
          course_id: id,
        },
      })
      return result
    } catch (error) {
      return null
    }
  }
}
module.exports = CourseService
