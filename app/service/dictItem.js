const { Service } = require("egg")
class DictItemService extends Service {
  //新增字典信息
  async addDictItem(params) {
    try {
      const { ctx } = this
      params.dict_item_value = Number(params.dict_item_value)
      params.sort_order = Number(params.sort_order)
    console.log('新增字典信息',params);
      const result = await ctx.model.DictItem.create(params)
      return result
    } catch (error) {
      return null
    }
  }
  // 获取字典分页信息
  async dictPage(params) {
    let { pageIndex, pageSize,dict_id } = params
    try {
      const { ctx } = this
      let where = {
        dict_id
      }
      const result = await ctx.model.DictItem.findAndCountAll({
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
  async getDictItemInfo(id) {
    console.log(id);
    try {
      const { ctx } = this
      const result = await ctx.model.DictItem.findOne({
        where: {
          dict_item_id: id,
        },
      })
      return result
    } catch (error) {
      return null
    }
  }
  // 修改
  async editDictItem(data) {
    let { dict_item_id } = data
    try {
      const { ctx } = this
      const result = await ctx.model.DictItem.update(
        { ...data },
        {
          where: {
            dict_item_id,
          },
        }
      )
      return result
    } catch (error) {
      return null
    }
  }
  // 删除
  async delDictItem(id) {
    try {
      const { ctx } = this
      const result = await ctx.model.DictItem.destroy({
        where: {
          dict_item_id: id,
        },
      })
      return result
    } catch (error) {
      return null
    }
  }
}
module.exports = DictItemService
