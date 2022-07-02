const {
  Service
} = require("egg")
class MerchantsService extends Service {
  //新增商户信息
  async addMerchants(params) {
    try {
      const {
        ctx
      } = this
      const result = await ctx.model.Merchants.create({
        ...params,
        merchants_id: Date.now()
      })
      return result
    } catch (error) {
      return null
    }
  }
  // 获取商户分页信息
  async merchantsPage(params) {
    let {
      pageIndex,
      pageSize,
      userId
    } = params
    try {
      const {
        ctx
      } = this
      let where = {}
      if (userId) {
        where = {
          user_id: parseInt(userId),
        }
      }
      const result = await ctx.model.Merchants.findAndCountAll({
        attributes: [
          'id',
          'merchants_id',
          'user_id', //用户ID
          'merchants_type', // 商户类型
          'merchants_name', // 商户名称
          'merchants_cover', // 商户名称
          'merchants_contact', // 商户联系人姓名
          'merchants_phone', // 商户电话
          'merchants_address', // 商户位置
          'merchants_notice', // 商家公告
          'merchants_collection', // 商户收藏数
          'merchants_collection', // 商户收藏数
          'merchants_createTime', // 商家入驻时间
          'merchants_longitude', // 经度
          'merchants_latitude', // 纬度
          'merchants_status', // 商户入驻审核状态
          'merchants_businessStatus', // 商户当前营业状态
        ],
        where,
        order: [
          ["id", "DESC"]
        ],
        limit: parseInt(pageSize), // 每页多少条
        offset: parseInt(pageSize) * (parseInt(pageIndex) - 1), // 跳过多少条
      })

      return result
    } catch (error) {
      return null
    }
  }
  async getMerchantsInfo(merchants_id) {
    try {
      const {
        ctx
      } = this
      const result = await ctx.model.Merchants.findOne({
        attributes: ['id',
          'merchants_id',
          'user_id', //用户ID
          'merchants_type', // 商户类型
          'merchants_name', // 商户名称
          'merchants_cover', // 商户名称
          'merchants_contact', // 商户联系人姓名
          'merchants_phone', // 商户电话
          'merchants_address', // 商户位置
          'merchants_notice', // 商家公告
          'merchants_collection', // 商户收藏数
          'merchants_collection', // 商户收藏数
          'merchants_createTime', // 商家入驻时间
          'merchants_longitude', // 经度
          'merchants_latitude', // 纬度
          'merchants_status', // 商户入驻审核状态
          'merchants_businessStatus', // 商户当前营业状态
        ],
        where: {
          merchants_id,
        },
      })
      return result
    } catch (error) {
      return null
    }
  }
  // 修改
  async editMerchants(data) {
    let {
      merchants_id
    } = data
    try {
      const {
        ctx
      } = this
      const result = await ctx.model.Merchants.update({
        ...data
      }, {
        where: {
          merchants_id,
        },
      })
      console.log(result, '修改啊');
      return result
    } catch (error) {
      return null
    }
  }
  // 删除
  async delMerchants(merchants_id) {
    try {
      const {
        ctx
      } = this
      const result = await ctx.model.Merchants.destroy({
        where: {
          merchants_id,
        },
      })
      return result
    } catch (error) {
      return null
    }
  }
  // 
  async getNearMerchantsPage({
    longitude,
    latitude
  }) {
    try {
      const {
        ctx
      } = this
      let where = {}
      const sql = `SELECT d_merchants.*,ROUND(${6378.138} * ${2} * ASIN(SQRT(POW( SIN( ( ${latitude} * PI( ) / ${180} - merchants_latitude * PI( ) / ${180} ) / ${2} ), ${2} ) + COS( ${latitude} * PI( ) / ${180} ) * COS( merchants_latitude * PI( ) / ${180} ) * POW( SIN( ( ${longitude} * PI( ) / ${180} - merchants_longitude * PI( ) / ${180} ) / ${2} ), ${2} ) ) ) * ${1000} ) AS distance FROM d_merchants WHERE merchants_status = 1 ORDER BY distance`
      const result = await ctx.model.query(sql, {
        type: 'SELECT'
      })
      result.forEach(item=>{
        item.distance = (item.distance / 1000).toFixed(3)
      })
      console.log(result,'result');
      return result
    } catch (error) {
      return null
    }
  }
}
module.exports = MerchantsService
