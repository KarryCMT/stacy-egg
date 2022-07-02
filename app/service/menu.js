const { Service } = require("egg")
class MenuService extends Service {
  //新增菜单信息
  async addMenu(params) {
    console.log(params)
    try {
      const { ctx } = this
      const result = await ctx.model.Menu.create(params)
      return result
    } catch (error) {
      return null
    }
  }
  // 获取菜单分页信息
  async menuPage(params) {
    let { pageIndex, pageSize } = params
    try {
      const { ctx } = this
      const result = await ctx.model.Menu.findAndCountAll({
        attributes: [
          "id",
          "menu_id",
          "name",
          "path",
          "title",
          "roles",
          "icon",
          "redirect",
          "alwaysShow",
          "component",
          "hidden",
          "pid",
          "created_at",
        ],
        order: [["id", "DESC"]],
        limit: parseInt(pageSize), // 每页多少条
        offset: parseInt(pageSize) * (parseInt(pageIndex) - 1), // 跳过多少条
      })
      return result
    } catch (error) {
      console.log(error)
      return null
    }
  }

  //获取菜单信息
  async menuInfo(id) {
    console.log(id, "menu_id")
    try {
      const { ctx } = this
      const result = await ctx.model.Menu.findOne({
        attributes: [
          "id",
          "menu_id",
          "name",
          "path",
          "title",
          "icon",
          "roles",
          "redirect",
          "alwaysShow",
          "component",
          "hidden",
          "pid",
          "created_at",
        ],
        where: {
          menu_id: id,
        },
      })
      return result
    } catch (error) {
      return null
    }
  }
  //修改菜单信息
  async editMenu(data) {
    let { menu_id } = data
    try {
      const { ctx } = this
      const result = await ctx.model.Menu.update(data, {
        where: {
          menu_id,
        },
      })
      return result
    } catch (error) {
      return null
    }
  }
  //删除菜单信息
  async delMenu(id) {
    try {
      const { ctx } = this
      const result = await ctx.model.Menu.destroy({
        where: {
          menu_id: id,
        },
      })
      return result
    } catch (error) {
      return null
    }
  }
}
module.exports = MenuService
