const { Service } = require("egg")
class CommentService extends Service {
  //新增评论信息
  async addComment(params) {
    try {
      const { ctx } = this
      const result = await ctx.model.Comment.create(params)
      this.addDynamicCommentNumber(params)

      return result
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async addDynamicCommentNumber(params) {
    const { ctx } = this
    try {
      const result = await ctx.model.Dynamic.update(
        { comment: params.comment + 1 },
        {
          where: {
            dynamic_id: params.dynamic_id,
          },
        }
      )
      console.log("评论数量加", result)
    } catch (error) {
      console.log(error)
      return null
    }
  }
  //获取评论分页
  async getCommentPage(id) {
    try {
      const { ctx } = this
      const result = await ctx.model.Comment.findAll({
        order: [
          ["id", "DESC"], // 逆序
          // ['id'] 正序
        ],
        where: {
          dynamic_id: id,
        },
        // limit: query.size, // 每页多少条
        // offset: query.size * (query.current - 1) // 跳过多少条
      })
      console.log("结果", result)
      return result
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
module.exports = CommentService
