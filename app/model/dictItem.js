module.exports = (app) => {
    const { STRING, INTEGER, BIGINT,DOUBLE, TEXT, DATE } = app.Sequelize
    const DictItem = app.model.define("dict_item", {
      id: { type: INTEGER, primaryKey: true },
      dict_item_id: BIGINT,
      dict_item_name:STRING(30),
      dict_item_value:INTEGER,
      sort_order:INTEGER,
      dict_id:BIGINT,
    })
    return DictItem
  }
  