module.exports = (app) => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize
  const Pay = app.model.define("pay", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    openid: STRING(50),
    order_id: STRING(50),
    pay_id:  STRING(50),
    pay_status: INTEGER,
    total_amount: INTEGER,
  })

  return Pay
}
