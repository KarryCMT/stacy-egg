const { Service } = require("egg")
class RoleService extends Service {
  //新增角色信息
  async addRole(params) {
    try {
      const { ctx } = this
      const result = await ctx.model.Role.create(params)
      return result
    } catch (error) {
      return null
    }
  }
  // 获取角色分页信息
  async rolePage(params) {
    let {pageIndex,pageSize} = params
    try {
      const { ctx } = this
      const result = await ctx.model.Role.findAndCountAll({
        attributes: ["id","role_id", "role_name","role_code", "role_desc","created_at"],
        order: [["id", "DESC"]],
        limit: parseInt(pageSize), // 每页多少条
        offset: parseInt(pageSize) * (parseInt(pageIndex) - 1), // 跳过多少条
      })
    
      return result
   
    } catch (error) {
      return null
    }
  }
  //获取角色信息
  async roleInfo(id){
    console.log(id,"role_id");
    try {
      const { ctx } = this
      const result = await ctx.model.Role.findOne({
        attributes: ["id","role_id","role_code", "role_name","role_desc"],
        where:{
          role_id:id
        }
      })
      return result
    } catch (error) {
      return null
    }
  }
  //修改角色信息
  async editRole(data){
    let {role_id} = data
    try {
      const { ctx } = this
      const result = await ctx.model.Role.update(data,{
        where:{
          role_id
        }
      })
      return result
    } catch (error) {
      return null
    }
  }
  //删除角色信息
  async delRole(id){
    try {
      const { ctx } = this
      const result = await ctx.model.Role.destroy({
        where:{
          role_id:id
        }
      })
      return result
    } catch (error) {
      return null
    }
  }
  // 角色分配菜单权限
  async setRoleMenus(data){
    let {role_id,menu_ids} = data
    let menuArr = menu_ids.split(',')
    try {
      const { ctx } = this
      const result = await ctx.model.RoleMenu.destroy({
        where:{
          role_id
        }
      })
      for (let i = 0; i < menuArr.length; i++) {
          const menu_id = menuArr[i]
          const res = await ctx.model.RoleMenu.create({role_id,menu_id:parseInt(menu_id)})
      }
      return true
    } catch (error) {
      return null
    }
  }
  async getRoleMenus(id){
   
    let role_id = id.role_id
    console.log(role_id,"role_idrole_id");
      try {
        const { ctx } = this
        let roleMenuModel = ctx.model.RoleMenu;
        let menuModel = ctx.model.Menu;
        // 下面是重点，blogModel的type_id，指向typeModel的id
        roleMenuModel.belongsTo(menuModel, {
          foreginkey: "menu_id",
          targetkey: "id",
      })
      let result = await roleMenuModel.findAll({
          attributes: ['id'],
          include: [{ model: menuModel,attributes: ["id","menu_id", "name","path","title","roles","icon","redirect","alwaysShow","component","hidden", "pid","created_at"]  }],
          where:{
            role_id:role_id
          }
      })
      let res = []
      result.map(item=>{
          res.push(item.menu)
      })
      console.log(res);
      return res
      } catch (error) {
      return null
      }
  }
}
module.exports = RoleService
