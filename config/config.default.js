/* eslint valid-jsdoc: "off" */
/**
 * @author karry
 * @param 当前开发环境
 */
"use strict"
const fs = require("fs")
const path = require("path")
const os = require("os")
module.exports = (appInfo) => {
  console.log("当前环境【default】:", appInfo.env)
  const config = (exports = {})
  config.keys = appInfo.name + "_karrys"
  config.middleware = []
  // 微信小程序信息配置
  config.wxApp = {
    design: {
      appid: "wxfd38a260f48bed3f",
      secret: "ca74dfee4b6d7c68a5bc29c5ef22d9a0",
    },
    MchId: "1606040193", //商户号
    MchKey: "FmONcRub2KLpeKmKF7mjcBWcmwDdEBNv", //API密钥
  }

  config.middleware = ["httpLog"]
  config.session = {
    key: "KARRY_SESS", //设置session的名称
    httpOnly: true, //是否由服务器来控制
    maxAge: 1000 * 60 * 60, //设置session的过期时间
    renew: true, //
  }
  config.sequelize = {
    dialect: "mysql",
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: os.platform() === "darwin" ? "1884873780" : "root",
    logging: true,
    timezone: "+08:00",
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    database: "design",
    define: {
      freezeTableName: true, //false为复数形式+s
      timestamps: false, // 关闭创建 更新 删除时间
      paranoid: false, // 是否必须传入时间戳
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      underscored: false, // 字段是否是下划线
    },
  }

  config.jwt = {
    secret: "karry", //加盐等于自己的签名
  }
  const userConfig = {
    salt: "karry",
    redisExpire: 60 * 60 * 24,
  }
  userConfig.security = {
    csrf: false,
    domainWhiteList: ["*"], //白名单IP无跨域问题
  }

  userConfig.multipart = {
    mode: "file",
    whitelist: [
      ".png",
      ".jpeg",
      ".jpg",
      ".gif",
      ".docx",
      ".doc",
      ".pdf",
      ".mp4",
    ],
    fileSize: "50mb",
  }

  userConfig.jwtSecret = "karry"
  return {
    ...config,
    ...userConfig,
  }
}
