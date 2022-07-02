module.exports = (app) => {
    const { STRING, INTEGER, TEXT, DATE } = app.Sequelize
    const Role = app.model.define("role", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      role_name: STRING(20),
      role_id: STRING(32),
      role_desc: STRING(100),
      role_code: STRING(10),
    })
    return Role
  }
  