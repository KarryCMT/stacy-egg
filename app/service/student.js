const { Service } = require("egg")
class StudentService extends Service {
  //新增学生信息
  async addStudent(params) {
    console.log('新增学生信息',params);
    if (!params.cover) {
      params.cover = 'https://iconfont.alicdn.com/t/ce99661e-151d-4341-9099-833a9fb62f5c.jpg'
    }
    try {
      const { ctx } = this
      const result = await ctx.model.Student.create(params)
      return result
    } catch (error) {
      return null
    }
  }
  // 获取学生分页信息
  async studentPage(params) {
    let { pageIndex, pageSize, userId } = params
    try {
      const { ctx } = this
      let where = {}
      if (userId) {
        where = {
          user_id: parseInt(userId),
        }
      }
      const result = await ctx.model.Student.findAndCountAll({
        attributes: [
          "id",
          "student_id",
          "user_id",
          "name",
          "cover",
          "sex",
          "address",
          "age",
          "phone",
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
  async getStudentInfo(id) {
    try {
      const { ctx } = this
      const result = await ctx.model.Student.findOne({
        attributes: [
          "id",
          "student_id",
          "user_id",
          "name",
          "sex",
          "cover",
          "address",
          "age",
          "phone",
        ],
        where: {
          student_id: id,
        },
      })
      return result
    } catch (error) {
      return null
    }
  }
  // 修改
  async editStudent(data) {
    let { student_id } = data
    try {
      const { ctx } = this
      const result = await ctx.model.Student.update(
        { ...data },
        {
          where: {
            student_id,
          },
        }
      )
      return result
    } catch (error) {
      return null
    }
  }
  // 删除
  async delStudent(id) {
    try {
      const { ctx } = this
      const result = await ctx.model.Student.destroy({
        where: {
          student_id: id,
        },
      })
      return result
    } catch (error) {
      return null
    }
  }
}
module.exports = StudentService
