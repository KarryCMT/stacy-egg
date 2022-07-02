"use strict"

module.exports = (app) => {
  const { router, controller, io } = app
  const auth = app.middleware.auth()
  // 验证码
  router.get("/api/user/authCode", controller.user.authCode) //获取验证码
  // 用户模块-------------------------------------------------------------
  router.post("/api/user/register", controller.user.register) //不需要验证Token
  router.post("/api/user/login", controller.user.login) //不需要验证Token
  router.post("/api/user/userlogin", controller.user.userlogin) //不需要验证Token

  router.post("/api/user/info", auth, controller.user.info)
  router.post("/api/user/logout", auth, controller.user.logout)
  router.get("/api/user/page", auth, controller.user.page)
  router.get("/api/user/userinfo", auth, controller.user.userInfo)
  router.put("/api/user/edit", auth, controller.user.edit)
  router.put("/api/user/editPwd", auth, controller.user.editPwd) //修改密码
  router.delete("/api/user/del", auth, controller.user.del)
  router.post("/api/user/mini", controller.user.wxLogin) //小程序获取openid

  // 角色模块------------------------------------------------------------------
  router.post("/api/role/add", auth, controller.role.register)
  router.get("/api/role/info", auth, controller.role.info)
  router.get("/api/role/page", auth, controller.role.page)
  router.put("/api/role/edit", auth, controller.role.edit)
  router.delete("/api/role/del", auth, controller.role.del)
  router.post("/api/role/roleMenus", auth, controller.role.roleMenus)
  router.get("/api/role/getRoleMenu", auth, controller.role.getRoleMenu)

  // 字典模块
  router.post("/api/dict/add", auth, controller.dict.add) //添加字典
  router.get("/api/dict/page", auth, controller.dict.page) //字典列表
  router.get("/api/dict/info", auth, controller.dict.info) //字典详情
  router.put("/api/dict/edit", auth, controller.dict.edit) //修改字典
  router.delete("/api/dict/del", auth, controller.dict.del) //删除字典
  router.post("/api/dict/item/add", auth, controller.dictItem.add) //添加字典
  router.post("/api/dict/selector", auth, controller.dict.postDictSelector) //字典选择器
  router.get("/api/dict/item/page", auth, controller.dictItem.page) //字典列表
  router.get("/api/dict/item/info", auth, controller.dictItem.info) //字典详情
  router.put("/api/dict/item/edit", auth, controller.dictItem.edit) //修改字典
  router.delete("/api/dict/item/del", auth, controller.dictItem.del) //删除字典
  // 菜单模块------------------------------------------------------------------
  router.post("/api/menu/add", auth, controller.menu.register)
  router.get("/api/menu/info", auth, controller.menu.info)
  router.get("/api/menu/page", auth, controller.menu.page)
  router.put("/api/menu/edit", auth, controller.menu.edit)
  router.delete("/api/menu/del", auth, controller.menu.del)
  // 上传模块------------------------------------------------------------------
  router.post("/api/upload/uploadImage", auth, controller.upload.uploadImage) //小程序上传图片
  // 动态模块------------------------------------------------------------------
  router.post("/api/dynamic/addDynamic", auth, controller.dynamic.addDynamic) //新增动态
  router.get(
    "/api/dynamic/getDynamicList",
    auth,
    controller.dynamic.getDynamicList
  ) //获取动态列表
  router.get(
    "/api/dynamic/getDynamicDetail",
    auth,
    controller.dynamic.getDynamicDetail
  ) //获取动态详情
  router.post(
    "/api/dynamic/addDynamicLike",
    auth,
    controller.dynamic.addDynamicLike
  ) //动态点赞
  // 评论模块------------------------------------------------------------------
  router.post("/api/comment/addComment", auth, controller.comment.addComment) //新增评论
  router.get(
    "/api/comment/getCommentList",
    auth,
    controller.comment.getCommentList
  ) //获取评论列表
  // 微信支付
  router.post("/api/pay/order", auth, controller.pay.getPay) //调用微信支付
  // 获取知乎热榜
  router.get("/api/base/getPacUrl", auth, controller.base.getPacUrl)

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // 商品模块
  router.post("/api/goods/add", auth, controller.goods.add) //商品添加
  router.get("/api/goods/page", auth, controller.goods.page) //商品列表
  router.get("/api/goods/info", auth, controller.goods.info) //商品详情
  router.put("/api/goods/edit", auth, controller.goods.edit) //修改商品
  router.delete("/api/goods/del", auth, controller.goods.del) //删除商品

  // 订单模块
  router.post("/api/order/add", auth, controller.order.add) //新增订单
  router.get("/api/order/page", auth, controller.order.page) //订单列表
  router.get("/api/order/info", auth, controller.order.info) //订单详情
  router.put("/api/order/edit", auth, controller.order.edit) //修改订单以及订单发货
  router.delete("/api/order/del", auth, controller.order.del) //删除订单
  router.put("/api/order/pay", auth, controller.order.pay) //订单支付

  // ++++++++++++++++教学系统 Start+++++++++++++++++
  // 学生模块
  router.post("/api/student/add", auth, controller.student.add) //添加学生
  router.get("/api/student/page", auth, controller.student.page) //学生列表
  router.get("/api/student/info", auth, controller.student.info) //学生详情
  router.put("/api/student/edit", auth, controller.student.edit) //修改学生
  router.delete("/api/student/del", auth, controller.student.del) //删除学生

  // 课程模块
  router.post("/api/course/add", auth, controller.course.add) //添加课程
  router.get("/api/course/page", auth, controller.course.page) //课程列表
  router.get("/api/course/info", auth, controller.course.info) //课程详情
  router.put("/api/course/edit", auth, controller.course.edit) //修改课程
  router.delete("/api/course/del", auth, controller.course.del) //删除课程
  // ++++++++++++++++教学系统 End+++++++++++++++++
  // ++++++++++++++++答题系统 Start++++++++++++++++
  router.post("/api/topic/add", auth, controller.topic.add) //添加题目
  router.get("/api/topic/page", auth, controller.topic.page) //题目列表
  router.get("/api/topic/info", auth, controller.topic.info) //题目详情
  router.put("/api/topic/edit", auth, controller.topic.edit) //修改题目
  router.delete("/api/topic/del", auth, controller.topic.del) //删除题目
  // ++++++++++++++++答题系统 End++++++++++++++++
  /**
   * @author karry
   * 商户模块
   */
  router.post("/api/merchants/add", auth, controller.merchants.add) //添加商户
  router.get("/api/merchants/page", auth, controller.merchants.page) //商户列表
  router.post("/api/merchants/info", auth, controller.merchants.info) //商户详情
  router.post("/api/merchants/edit", auth, controller.merchants.edit) //修改商户
  router.delete("/api/merchants/del", auth, controller.merchants.del) //删除商户
  router.post("/api/merchants/near", auth, controller.merchants.getNearPage) //获取当前用户附近的商户
}
