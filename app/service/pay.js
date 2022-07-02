"use strict"
const { Service } = require("egg")
const crypto = require("crypto")
const { randomString, ransign, getSign, checkSign, } = require('../public/js/util')
const md5 = require("md5")
// 微信基本配置
class PayService extends Service {
  // 生成随机字符串
  randomStr(len = 24) {
    const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < len; i++) {
      result += str[Math.floor(Math.random() * str.length)]
    }
    return result
  }
  // 签名
  getSign(params) {
    const { app } = this
    const paramsArr = Object.keys(params)
    paramsArr.sort()
    const stringArr = []
    paramsArr.map((key) => {
      stringArr.push(key + "=" + params[key])
    })
    // 最后加上 商户Key
    stringArr.push("key=" + app.config.wxApp.MchKey)
    const string = stringArr.join("&")
    return md5(string).toString().toUpperCase()
  }
  // 随机6位数
  MathRand() {
    let Num = ""
    for (var i = 0; i < 6; i++) {
      Num += Math.floor(Math.random() * 10)
    }
    return Num
  }
  async addOrder(params) {
    try {
      const { ctx } = this
      const result = await ctx.model.Pay.create(params)
      return result
    } catch (error) {
      console.log(error)
      return null
    }
  }
  async pay(PayType, body, money) {
    const { ctx, service, app } = this
    let No = Date.now()
    let OrderNo = moment().format("YYYYMMDDHHmm") + randomString(3) + No
    let createTime = moment().format("YYYY-MM-DD HH:mm:ss")
    let order = {
      //统一订单参数
      device_info: "WEB",
      body,
      out_trade_no: OrderNo,
      total_fee: new Decimal(money).mul(new Decimal(100)).toFixed(),
      attach: `${UserId}`,
    }
    if (PayType == "H5") {
      order.scene_info = JSON.stringify({
        h5_info: "h5_info",
        type: "Wap",
        wap_url: this.config.h5host,
        wap_name: "峰会报名付款",
      })
    }
    const unifiedRes = await this.unifiedOrder(
      order,
      PayType == "H5" ? "MWEB" : "NATIVE"
    )
    return unifiedRes
  }

  //支付回调
  async payaction(params) {
    const { ctx, service, app } = this
    const {
      appid, //公众账号ID
      bank_type, //付款银行
      cash_fee, //现金支付金额
      device_info, //设备号
      fee_type, //货币种类
      is_subscribe, //是否关注公众账号
      mch_id, //商户号
      nonce_str, //随机字符串
      openid, //用户标识
      out_trade_no, //商户订单号
      result_code, //业务结果
      return_code, //返回状态码
      sign, //签名
      time_end, //支付完成时间
      total_fee, //订单金额
      trade_type, //交易类型
      transaction_id, //微信支付订单号
      attach,
    } = params

    if (return_code == "SUCCESS") {
      if (checkSign(params, this.config.wechatPay.client.secret)) {
        //解析回调数据是否正确
        //自己处理
      } else {
        return {
          msg: "签名错误",
          status: "error",
        }
      }
    } else {
      return {
        msg: "支付失败",
        status: "error",
      }
    }
  }

  //退款
  async refund(out_trade_no, refund_fee, refund_desc, PayPrice) {
    const { ctx, service, app } = this

    let nonce_str = randomString(32)

    let out_refund_no = moment().format("YYYYMMDDHHmmss") + randomString(25)

    let data = {
      appid: this.config.wechatPay.client.appId,
      mch_id: this.config.wechatPay.client.merchantId,
      nonce_str, //随机字符串
      out_trade_no, //订单号
      out_refund_no, //退款订单号
      total_fee: new Decimal(PayPrice).mul(new Decimal(100)).toFixed(), //总金额
      refund_fee: new Decimal(refund_fee).mul(new Decimal(100)).toFixed(), //退款金额
      refund_desc, //退款原因描述
      notify_url: this.config.wechatPay.client.REFUNDNotifyUrl, //退款成功回调地址
    }
    let sign = getSign(data, this.config.wechatPay.client.secret) //签名
    let xml = {
      ...data,
      sign,
    }
    try {
      const curlres = await ctx.curl(`${this.config.wechatPay.URLS.REFUND}`, {
        method: "POST",
        pfx: this.config.wechatPay.client.pfx, //退款证书
        passphrase: this.config.wechatPay.client.merchantId,
        // 直接发送原始 xml 数据，不需要 HttpClient 做特殊处理
        content: this.app.wechatPay.stringify(xml),
      })

      let rdata = await this.app.wechatPay.parse(curlres.data) //解析xml数据

      return {
        res: rdata,
      }
    } catch (error) {
      console.log(error, "error")
      if (error == "invalid refund_fee") {
        return {
          msg: "退款金额不正确",
          status: "error",
        }
      } else {
        return {
          msg: "退款失败",
          status: "error",
        }
      }
    }
  }

  //微信内部浏览器或小程序 统一创建支付
  async CreatePaymentInfo(money, openid) {
    const { ctx, service, app } = this

    let No = Date.now()
    let OrderNo = moment().format("YYYYMMDDHHmmss") + randomString(3) + No
    const order = {
      //统一订单参数
      device_info: "WEB",
      body: "", //费用说明
      out_trade_no: OrderNo, //订单编号
      total_fee: new Decimal(money).mul(new Decimal(100)).toFixed(), //支付金额 分为单位
      openid, //用户openid
    }
    const res = await this.unifiedOrder(order) //请求生成订单信息
    return {
      res,
    }
  }

  async unifiedOrder(order, trade_type = "JSAPI") {
    const { ctx, service } = this
    let nonce_str = randomString(32) //随机字符串
    let Data = {
      appid: this.config.wechatPay.client.appId,
      mch_id: this.config.wechatPay.client.merchantId, //商户号
      nonce_str,
      sign_type: "MD5", //签名方式
      spbill_create_ip: ctx.ip, //用户ip
      trade_type, //支付类型
      notify_url: this.config.wechatPay.client.notifyUrl, //支付成功回调地址
      time_expire: moment().add(1, "h").format("YYYYMMDDHHmmss"),
      ...order,
    }

    let sign = getSign(Data, this.config.wechatPay.client.secret) //签名
    let xml = {
      ...Data,
      sign,
    }
    const cur = await ctx.curl(`${this.config.wechatPay.URLS.UNIFIED_ORDER}`, {
      method: "POST",
      // 直接发送原始 xml 数据，不需要 HttpClient 做特殊处理
      content: this.app.wechatPay.stringify(xml),
    })
    const parseData = await this.app.wechatPay.parse(cur.data)
    let res = {
      appId: Data.appid,
      nonceStr: nonce_str,
      package: `prepay_id=${parseData.prepay_id}`,
      timeStamp: moment().add(1, "h").unix().toString(),
      signType: "MD5",
    }
    if (trade_type == "MWEB") {
      //手机浏览器H5支付
      res.mweb_url = parseData.mweb_url
    }

    if (trade_type == "NATIVE") {
      //可用于微信扫一扫支付
      res.code_url = parseData.code_url
    }

    return {
      ...res,
      paySign: getSign(res, this.config.wechatPay.client.secret),
    }
  }
}
module.exports = PayService
