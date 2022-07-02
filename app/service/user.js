const { Service } = require("egg")
const md5 = require("md5")
class UserService extends Service {
  //获取用户信息
  async getUser(username, password) {
    try {
      const { ctx, app } = this
      const _where = password
        ? { username, password: md5(password + app.config.salt) }
        : { username }
      const result = await ctx.model.User.findOne({
        where: _where,
      })
      return result
    } catch (error) {
      return null
    }
  }
  //新增用户信息
  async addUser(params) {
    try {
      const { ctx } = this
      const result = await ctx.model.User.create(params)
      return result
    } catch (error) {
      return null
    }
  }
  // 获取用户分页信息
  async userPage(params) {
    let { pageIndex, pageSize } = params
    try {
      const { ctx } = this
      const result = await ctx.model.User.findAndCountAll({
        attributes: [
          "id",
          "user_id",
          "user_name",
          "introduction",
          "roles",
          "avatar",
          "balance",
          "nick_name",
          "phone",
          "created_at",
        ],
        order: [["id", "DESC"]],
        limit: parseInt(pageSize), // 每页多少条
        offset: parseInt(pageSize) * (parseInt(pageIndex) - 1), // 跳过多少条
      })

      return result
    } catch (error) {
      return null
    }
  }
  async getUserInfo(id) {
    try {
      const { ctx } = this
      const result = await ctx.model.User.findOne({
        attributes: [
          "id",
          "user_id",
          "user_name",
          "nick_name",
          "balance",
          "introduction",
          "roles",
          "avatar",
          "phone",
          "created_at",
          "role_id",
        ],
        where: {
          user_id: id,
        },
      })
      return result
    } catch (error) {
      return null
    }
  }
  async getUserPwd(id) {
    try {
      const { ctx } = this
      const result = await ctx.model.User.findOne({
        attributes: [
          "id",
          "user_id",
          "user_name",
          "introduction",
          "password",
          "roles",
          "avatar",
          "phone",
          "created_at",
          "role_id",
        ],
        where: {
          user_id: id,
        },
      })
      return result
    } catch (error) {
      return null
    }
  }
  async editUser(data) {
    let { user_id } = data
    try {
      const { ctx } = this
      const result = await ctx.model.User.update(
        { ...data },
        {
          where: {
            user_id,
          },
        }
      )
      return result
    } catch (error) {
      return null
    }
  }
  async editUserPwd(data) {
    let { user_id, password, encrypt } = data
    try {
      const { ctx } = this
      const result = await ctx.model.User.update(
        { password, encrypt },
        {
          where: {
            user_id,
          },
        }
      )
      return result
    } catch (error) {
      return null
    }
  }
  async delUser(id) {
    try {
      const { ctx } = this
      const result = await ctx.model.User.destroy({
        where: {
          user_id: id,
        },
      })
      return result
    } catch (error) {
      return null
    }
  }
  // 后台管理系统登录
  async userLogin(params) {
    let { user_name } = params
    try {
      const { ctx } = this
      const result = await ctx.model.User.findOne({
        attributes: [
          "user_id",
          "user_name",
          "avatar",
          "introduction",
          "role_id",
          "password",
          "roles",
          "encrypt",
        ],
        where: { user_name },
      })
      return result
    } catch (error) {
      return null
    }
  }
  //添加小程序用户记录
  async addWxUser(params) {
    try {
      const { ctx } = this
      const result = await ctx.model.User.create(params)
      return result
    } catch (error) {
      return null
    }
  }
  //查询小程序用户是否存在数据库
  async getWxUser(openid) {
    const { ctx, app } = this
    try {
      const result = await ctx.model.User.findOne({
        where: { openid },
      })
      return result
    } catch (error) {
      return null
    }
  }
}
module.exports = UserService
