module.exports = (app) => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize
  const RoleMenu = app.model.define("role_menu", {
    role_id: {
      type: INTEGER,
    },
    menu_id: {
      type: INTEGER,
    },
  })
  return RoleMenu
}
