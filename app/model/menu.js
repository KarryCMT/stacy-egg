module.exports = (app) => {
    const { STRING, INTEGER, TEXT, DATE } = app.Sequelize
    const Menu = app.model.define("menu", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(20),
      pid: INTEGER,
      menu_id: STRING(32),
      path: STRING(20),
      component: STRING(50),
      hidden: INTEGER,
      title: STRING(50),
      icon: STRING(50),
      redirect: STRING(50),
      roles: STRING(100),
      alwaysShow: INTEGER,
    })
    return Menu
  }
  