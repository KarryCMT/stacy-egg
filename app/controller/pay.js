"use strict"
const BaseController = require("./base")
const dayjs = require("dayjs")
const convert = require("xml-js")
const xml2js = require("xml2js").parseString
class PayController extends BaseController {
  // 微信支付
  async getPay() {
    const { ctx, service, app } = this
    const { openid, total_fee, body } = ctx.request.body
    const tradeNo = Date.now() + "" + service.pay.MathRand() // 生成订单号
    const orderParams = {
      appid: app.config.wxApp.design.appid, // 小程序id
      mch_id: app.config.wxApp.MchId, // 商户id
      nonce_str: service.pay.randomStr(), // 自定义生成随机字符方法
      sign_type: "MD5", // 加密类型
      body, // 商品简单描述，有格式要求
      out_trade_no: tradeNo, // 订单号
      total_fee, // 单位：分
      spbill_create_ip: "125.80.135.240", // 服务器ip
      notify_url: "https://lengnuanit.top", // 支付成功通知地址
      trade_type: "JSAPI", // 支付方式（小程序支付选JSAPI）
      openid, // 用户openid，步骤0保存的数据
    }
    // 签名：对上面所有参数加密（签名算法请查看接口文档，下同）
    const orderSign = service.pay.getSign(orderParams)
    // json->xml
    const xmlData = convert.js2xml(
      { xml: { ...orderParams, sign: orderSign } },
      { compact: true }
    )

    // 调用统一下单接口（接口没说明，但必须为post请求）
    const { data } = await ctx.curl(
      "https://api.mch.weixin.qq.com/pay/unifiedorder",
      {
        method: "post",
        data: xmlData,
      }
    )
    const result = convert.xml2js(data, { compact: true })
    if (result.xml) {
      // 此处可以把订单信息保存到数据库
      // 返回prepay_id后，接着就是把参数返回前端
      // 支付签名参数
      // const payStatus = await service.pay.addOrder()
      const payParams = {
        appId:  app.config.wxApp.design.appid, // 小程序 id
        timeStamp: Date.now().toString(), // 时间戳
        nonceStr: orderParams.nonce_str, // 随机字符
        package: `prepay_id=${result.xml.prepay_id._cdata}`, //预支付会话标识（格式为：prepay_id=统一下单接口返回数据）
        signType: "MD5", //签名类型（必须与上面的统一下单接口一致）
      }
      // 签名
      const paySign = service.pay.getSign(payParams)
      // 把参数+签名返回给前端
      let paydata = {
        timeStamp: payParams.timeStamp,
        nonceStr: payParams.nonceStr,
        package: payParams.package,
        signType: payParams.signType,
        paySign,
      }
      this.Success({ paydata, msg: "下单成功" })
    }
    // xml2js(data, { explicitArray: false }, (err, json) => {
    //   if (err) {
    //     console.log(err)
    //   } else {

    //   }
    // })
  }
}

module.exports = PayController
