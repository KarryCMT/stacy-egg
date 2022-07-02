module.exports = (app) => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize
  const Dynamic = app.model.define("dynamic", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    openid: STRING(200),
    dynamic_id: STRING(200),
    banner_url: TEXT,
    title: STRING(100),
    username: STRING(100),
    avatar_url: STRING(200),
    like:INTEGER,
    star:INTEGER,
    comment:INTEGER,
    share:INTEGER,
    desc: TEXT,
  })

  return Dynamic
}
