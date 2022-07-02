const { Service } = require("egg")
class OrderService extends Service {
  //新增订单信息
  async addOrder(params) {
    console.log(params)
    try {
      const { ctx } = this
      const result = await ctx.model.Order.create(params)
      return result
    } catch (error) {
      return null
    }
  }
  // 获取订单分页信息
  async orderPage(params) {
    let { pageIndex, pageSize, userId } = params
    let where = {}
    if (userId) {
      where = {
        merchant_id: parseInt(userId),
      }
    }
    try {
      const { ctx } = this
      const result = await ctx.model.Order.findAndCountAll({
        attributes: [
          "id",
          "goods_id",
          "goods_cover",
          "logistics_id",
          "goods_name",
          "is_pay",
          "user_id",
          "order_id",
          "merchant_id",
          "amount",
          "created_time",
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
  // 获取订单详情信息
  async getOrderInfo(id) {
    try {
      const { ctx } = this
      const result = await ctx.model.Order.findOne({
        where: {
          order_id: id,
        },
      })
      return result
    } catch (error) {
      return null
    }
  }
  // 修改订单
  async editOrder(data) {
    let { order_id } = data
    try {
      const { ctx } = this
      const result = await ctx.model.Order.update(
        { ...data },
        {
          where: {
            order_id,
          },
        }
      )
      return result
    } catch (error) {
      return null
    }
  }
  // 用户支付订单
  async userPayOrder(data) {
    let { order_id, goods_id, user_id, amount } = data
    try {
      const { ctx } = this
      // 1 先查询余额
      const balance = await ctx.model.User.findOne({
        attributes: ["balance"],
        where: {
          user_id,
        },
      })
      // 2 查询商品价格以及库存
      const price = await ctx.model.Goods.findOne({
        attributes: ["price", "inventory"],
        where: {
          goods_id,
        },
      })
      if (balance.balance > 0 && price.price) {
        if (balance.balance >= price.price * amount) {
          // 3 余额大于支付金额，更新用户余额
          const user = await ctx.model.User.update(
            { balance: balance.balance - price.price * amount },
            {
              where: {
                user_id,
              },
            }
          )
          // 4 更新商品库存数量
          const inventory = await ctx.model.Goods.update(
            { inventory: price.inventory - amount },
            {
              where: {
                goods_id,
              },
            }
          )
          // 5 更新订单状态
          const status = await ctx.model.Order.update(
            { is_pay: 1 },
            {
              where: {
                order_id,
              },
            }
          )
          return status
        }
      }
    } catch (error) {
      return null
    }
  }
  // 删除
  async delOrder(id) {
    try {
      const { ctx } = this
      const result = await ctx.model.Order.destroy({
        where: {
          order_id: id,
        },
      })
      return result
    } catch (error) {
      return null
    }
  }
}
module.exports = OrderService
