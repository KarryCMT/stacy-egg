module.exports = (app) => {
  const { STRING, INTEGER, BIGINT,DOUBLE, TEXT, DATE } = app.Sequelize
  const Goods = app.model.define("goods", {
    id: { type: INTEGER, primaryKey: true },
    goods_id: BIGINT,
    title: STRING(100),
    price: DOUBLE,
    desc: STRING,
    cover: STRING(255),
    cate_id: BIGINT,
    inventory: INTEGER,
    merchant_id: BIGINT,
  })

  return Goods
}
