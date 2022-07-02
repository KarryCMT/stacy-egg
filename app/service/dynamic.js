const { Service } = require("egg")
class DynamicService extends Service {
  //新增动态信息
  async addDynamic(params) {
    try {
      const { ctx } = this
      const result = await ctx.model.Dynamic.create(params)
      return result
    } catch (error) {
      console.log(error)
      return null
    }
  }
  //获取动态分页
  async getDynamicPage(query) {
    try {
      const { ctx } = this
      const result = await ctx.model.Dynamic.findAndCountAll({
        order: [
          ["id", "DESC"], // 逆序
          // ['id'] 正序
        ],
        limit: query.size, // 每页多少条
        offset: query.size * (query.current - 1), // 跳过多少条
      })
      console.log(result)
      return result
    } catch (error) {
      console.log(error)
      return null
    }
  }
  //获取动态详情
  async getDynamicInfo(id) {
    const { ctx, app } = this
    try {
      const result = await ctx.model.Dynamic.findOne({
        where: { dynamic_id: id },
      })
      return result
    } catch (error) {
      console.log(error)
      return null
    }
  }
  // 动态点赞
  async addLike(num) {
    try {
      const { ctx } = this
      const result = await ctx.model.Dynamic.update(
        { like: num.count },
        {
          where: {
            dynamic_id: num.dynamicId,
          },
        }
      )
      return result
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
module.exports = DynamicService
