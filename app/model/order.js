module.exports = (app) => {
  const { STRING, INTEGER, BIGINT, TEXT, DATE } = app.Sequelize
  const Order = app.model.define("order", {
    id: { type: INTEGER, primaryKey: true },
    order_id: BIGINT,
    goods_id: BIGINT,
    user_id: BIGINT,
    logistics_id:STRING(200),
    merchant_id: BIGINT,
    amount: INTEGER,
    goods_name: STRING(255),
    goods_cover: STRING(255),
    is_pay: INTEGER,
    created_time: DATE,
  })

  return Order
}
