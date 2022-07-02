const { Service } = require("egg")
class DictService extends Service {
  //新增字典信息
  async addDict(params) {
    console.log("新增字典信息", params)
    try {
      const { ctx } = this
      const result = await ctx.model.Dict.create(params)
      return result
    } catch (error) {
      return null
    }
  }
  // 获取字典分页信息
  async dictPage(params) {
    let { pageIndex, pageSize } = params
    try {
      const { ctx } = this
      let where = {}
      const result = await ctx.model.Dict.findAndCountAll({
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
  async getDictInfo(id) {
    try {
      const { ctx } = this
      const result = await ctx.model.Dict.findOne({
        where: {
          dict_id: id,
        },
      })
      return result
    } catch (error) {
      return null
    }
  }
  // 修改
  async editDict(data) {
    let { dict_id } = data
    try {
      const { ctx } = this
      const result = await ctx.model.Dict.update(
        { ...data },
        {
          where: {
            dict_id,
          },
        }
      )
      return result
    } catch (error) {
      return null
    }
  }
  // 删除
  async delDict(id) {
    try {
      const { ctx } = this
      const result = await ctx.model.Dict.destroy({
        where: {
          dict_id: id,
        },
      })
      return result
    } catch (error) {
      return null
    }
  }

  // 关联查询
  async getDictionarySelector(code) {
    const { ctx } = this
    try {
      const row = await ctx.model.Dict.findOne({
        where: {
          dict_code: code,
        },
      })
      if (row.dict_id) {
        const result = await ctx.model.DictItem.findAll({
          where: {
            dict_id: row.dict_id,
          },
        })
        return result
      }
    } catch (error) {
      return null
    }
  }
}
module.exports = DictService
