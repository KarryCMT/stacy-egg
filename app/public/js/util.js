const crypto = require('crypto');
const fs = require('fs')
const path = require('path')

function randomString(len) {
  // isFinite 判断是否为有限数值
  if (!Number.isFinite(len)) {
    throw new TypeError('Expected a finite number');
  }
  return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len);
}


function getSign(params, key, type = 'MD5') {//支付签名
  const paramsArr = Object.keys(params);
  paramsArr.sort();
  const stringArr = []
  paramsArr.map(key => {
    if (key != 'sign' && params[key])
      stringArr.push(key + '=' + params[key]);
  })
  if (type == "MD5") {
    // 最后加上 商户Key
    stringArr.push("key=" + key)
    const string = stringArr.join('&');
    const MD5 = crypto.createHash('md5');
    return MD5.update(string).digest('hex').toUpperCase();
  } else {
    return crypto.createHmac('sha256', key)
      .update(stringArr.join('&'))
      .digest('hex').toUpperCase();
  }

}

function checkSign(params, key) { //验证签名是否正确
  const {
    sign
  } = params;
  const Newsign = getSign(params, key)
  if (sign === Newsign) {
    return true
  } else {
    return false
  }
}
module.exports = {
  checkSign,
  getSign,
  randomString
}


