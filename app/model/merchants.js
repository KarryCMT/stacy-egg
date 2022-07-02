module.exports = (app) => {
  const {
    STRING,
    INTEGER,
    BIGINT,
    DOUBLE,
    TEXT,
    DATE
  } = app.Sequelize
  const Merchants = app.model.define("d_merchants", {
    id: {
      type: INTEGER,
      primaryKey: true
    },
    merchants_id: {
      type: BIGINT,
    }, // 商户ID
    user_id: BIGINT, //用户ID
    merchants_type: INTEGER, // 商户类型
    merchants_name: STRING(50), // 商户名称
    merchants_cover: STRING(255), // 商户名称
    merchants_contact: STRING(10), // 商户联系人姓名
    merchants_phone: STRING(11), // 商户电话
    merchants_address: STRING(150), // 商户位置
    merchants_notice: TEXT, // 商家公告
    merchants_collection: INTEGER, // 商户收藏数
    merchants_collection: INTEGER, // 商户收藏数
    merchants_createTime: DATE, // 商家入驻时间
    merchants_longitude: DOUBLE, // 经度
    merchants_latitude: DOUBLE, // 纬度
    merchants_status: INTEGER, // 商户入驻审核状态
    merchants_businessStatus: INTEGER, // 商户当前营业状态
  })

  return Merchants
}
