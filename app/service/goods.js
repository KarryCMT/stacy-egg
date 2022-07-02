const { Service } = require("egg")
class GoodsService extends Service {
  //新增商品信息
  async addGoods(params) {
    try {
      const { ctx } = this
      const result = await ctx.model.Goods.create(params)
      return result
    } catch (error) {
      return null
    }
  }
  // 获取商品分页信息
  async goodsPage(params) {
    let { pageIndex, pageSize, userId } = params
    try {
      const { ctx } = this
      let where = {}
      if (userId) {
        where = {
          merchant_id: parseInt(userId),
        }
      }
      const result = await ctx.model.Goods.findAndCountAll({
        attributes: [
          "id",
          "goods_id",
          "title",
          "desc",
          "cover",
          "merchant_id",
          "price",
          "inventory",
          "cate_id",
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
  async getGoodsInfo(id) {
    try {
      const { ctx } = this
      const result = await ctx.model.Goods.findOne({
        attributes: [
          "id",
          "goods_id",
          "title",
          "desc",
          "cover",
          "price",
          "merchant_id",
          "inventory",
          "cate_id",
        ],
        where: {
          goods_id: id,
        },
      })
      return result
    } catch (error) {
      return null
    }
  }
  // 修改
  async editGoods(data) {
    let { goods_id } = data
    try {
      const { ctx } = this
      const result = await ctx.model.Goods.update(
        { ...data },
        {
          where: {
            goods_id,
          },
        }
      )
      return result
    } catch (error) {
      return null
    }
  }
  // 删除
  async delGoods(id) {
    try {
      const { ctx } = this
      const result = await ctx.model.Goods.destroy({
        where: {
          goods_id: id,
        },
      })
      return result
    } catch (error) {
      return null
    }
  }
}
module.exports = GoodsService
