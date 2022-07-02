const { Service } = require("egg")
class TopicService extends Service {
  //新增题目信息
  async addTopic(params) {
    try {
      const { ctx } = this
      const result = await ctx.model.Topic.create(params)
      return result
    } catch (error) {
      return null
    }
  }
  // 获取题目分页信息
  async topicPage(params) {
    let { pageIndex, pageSize, userId } = params
    try {
      const { ctx } = this
      let where = {}
      if (userId) {
        where = {
          user_id: parseInt(userId),
        }
      }
      const result = await ctx.model.Topic.findAndCountAll({
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
  async getTopicInfo(id) {
    try {
      const { ctx } = this
      const result = await ctx.model.Topic.findOne({
        where: {
          topic_id: id,
        },
      })
      return result
    } catch (error) {
      return null
    }
  }
  // 修改
  async editTopic(data) {
    let { topic_id } = data
    try {
      const { ctx } = this
      const result = await ctx.model.Topic.update(
        { ...data },
        {
          where: {
            topic_id,
          },
        }
      )
      return result
    } catch (error) {
      return null
    }
  }
  // 删除
  async delTopic(id) {
    try {
      const { ctx } = this
      const result = await ctx.model.Topic.destroy({
        where: {
          topic_id: id,
        },
      })
      return result
    } catch (error) {
      return null
    }
  }

}
module.exports = TopicService
