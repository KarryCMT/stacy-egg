module.exports = (app) => {
    const { STRING, INTEGER, BIGINT,DOUBLE, TEXT, DATE } = app.Sequelize
    const Dict = app.model.define("dict", {
      id: { type: INTEGER, primaryKey: true },
      dict_id: BIGINT,
      dict_name:STRING(10),
      dict_code:STRING(50),
      dict_desc:STRING(100),
      del_flag:INTEGER,
    })
    return Dict
  }
  