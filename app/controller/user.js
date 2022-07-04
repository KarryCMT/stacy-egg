'use strict';

const BaseController = require('./base');
const { sign, verify } = require('jsonwebtoken');
const svgCaptcha = require('svg-captcha');
const WXBizDataCrypt = require('../middleware/WXBizDataCrypt');
const md5 = require('md5');
const dayjs = require('dayjs');
const bcrypt = require('bcryptjs');
class UserController extends BaseController {
  // 用户新增&注册
  async register() {
    const { ctx, app, service } = this;
    const body = ctx.request.body;
    body.userId = Date.now();
    const result = await service.user.addUser(body);
    // set
    await app.redis.set('foo', 1);
    // get
    const response = await app.redis.get('foo');
    console.log(response,'response');
    if (result) {
      this.Success({ message: '新增成功' });
    } else {
      this.Error({ message: '新增失败' });
    }
  }
  // 获取验证码
  async authCode() {
    const { ctx } = this;
    const captchaObj = svgCaptcha.createMathExpr({
      noise: 5,
      color: true,
      mathMin: 1,
      mathMax: 20,
      mathOperator: '+/-',
    });
    ctx.set('Content-Type', 'image/svg+xml');
    ctx.session.code = 'captchaObj.text'; //把文本信息存放到会话中的captcha属性中
    const data = captchaObj.data;
    this.Success({ data, message: '获取成功' });
  }
  //用户登录
  async login() {
    const { ctx, service } = this;
    const params = ctx.request.body;
    const data = await service.user.userLogin(params);
    if (!data) {
      this.Error({ data: {}, message: '登录失败,该用户不存在！' });
    } else {
      const correct = bcrypt.compareSync(data.encrypt, params.password);
      console.log(correct);
      if (correct) {
        delete data.dataValues.encrypt;
        data.dataValues.roles = [data.dataValues.roles];
        let token = sign(data.dataValues, this.config.jwtSecret, {
          expiresIn: '8h',
        });
        this.Success({ token, message: '登录成功' });
      } else {
        this.Error({ data: {}, message: '登录失败,请输入正确的密码！' });
      }
      // let roles = [data.dataValues.role_id]
    }
  }
  // 小程序用户名登录
  async userlogin() {
    const { ctx, service } = this;
    const params = ctx.request.body;
    const data = await service.user.userLogin(params);
    if (!data) {
      this.Error({ data: {}, message: '登录失败,该用户不存在！' });
    } else {
      const correct = bcrypt.compareSync(params.password, data.password);
      if (correct) {
        delete data.dataValues.encrypt;
        data.dataValues.roles = [data.dataValues.roles];
        let token = sign(data.dataValues, this.config.jwtSecret, {
          expiresIn: '8h',
        });
        this.Success({ token, message: '登录成功' });
      } else {
        this.Error({ data: {}, message: '登录失败,请输入正确的密码！' });
      }
      // let roles = [data.dataValues.role_id]
    }
  }
  //获取登录用户信息
  async info() {
    const { ctx, service, app } = this;
    const { token } = ctx.request.body;
    let data = verify(token, this.config.jwtSecret);
    delete data.password;
    if (data) {
      this.Success({ data, message: '获取成功' });
    } else {
      this.Error('获取失败');
    }
  }
  // 获取用户分页列表
  async page() {
    const { ctx, service } = this;
    let params = ctx.request.query;
    const data = await service.user.userPage(params);
    if (data) {
      this.Success({ data, message: '获取成功' });
    } else {
      this.Error({ message: '获取失败' });
    }
  }
  // 获取用户详情信息
  async userInfo() {
    const { ctx, service } = this;
    let { id } = ctx.request.query;
    const data = await service.user.getUserInfo(id);
    if (data) {
      this.Success({ data, message: '获取成功' });
    } else {
      this.Error({ message: '获取失败' });
    }
  }
  // 修改用户信息
  async edit() {
    const { ctx, service } = this;
    let body = ctx.request.body;
    const data = await service.user.editUser(body);
    if (data) {
      this.Success({ data: {}, message: '修改成功' });
    } else {
      this.Error({ message: '修改失败' });
    }
  }
  async editPwd() {
    const { ctx, service } = this;
    const { password, user_id, newPwd1, newPwd2 } = ctx.request.body;
    if (newPwd1 !== newPwd2) {
      this.Error({ message: '两次密码输入不一致' });
      return;
    }
    const pwd = await service.user.getUserPwd(user_id);
    const correct = bcrypt.compareSync(password, pwd.password);
    if (correct) {
      const data = await service.user.editUserPwd({
        password: newPwd2,
        user_id,
      });
      if (data) {
        this.Success({ data: {}, message: '修改密码成功' });
      } else {
        this.Error({ message: '修改密码失败' });
      }
    } else {
      this.Error({ message: '请输入正确的原密码' });
    }
  }

  // 修改用户信息
  async del() {
    const { ctx, service } = this;
    let { id } = ctx.request.query;
    const data = await service.user.delUser(id);
    if (data) {
      this.Success({ data: {}, message: '删除成功' });
    } else {
      this.Error({ message: '删除失败' });
    }
  }
  //获取用户退出
  async logout() {
    const { ctx, service, app } = this;
    this.Success({ data: true, message: '退出成功' });
  }
  //获取小程序sessionkey
  async wxLogin() {
    const { ctx, app } = this;
    const appid = app.config.wxApp.design.appid;
    const secret = app.config.wxApp.design.secret;
    const { code, encryptedData, iv } = ctx.request.body;
    try {
      let result = await ctx.curl(
        'https://api.weixin.qq.com/sns/jscode2session?appid=' +
          appid +
          '&secret=' +
          secret +
          '&js_code=' +
          code +
          '&grant_type=authorization_code'
      );
      const { session_key, openid } = JSON.parse(result.data.toString());
      if (session_key) {
        const pc = new WXBizDataCrypt(appid, session_key);
        const data = pc.decryptData(encryptedData, iv);
        if (data) {
          const postData = {
            user_id: Date.now(),
            openid: openid,
            nick_name: data.nickName,
            gender: data.gender,
            avatar_url: data.avatarUrl,
          };
          let token = sign(postData, this.config.jwtSecret, {
            expiresIn: '7d',
          });
          const isUser = await ctx.service.user.getWxUser(openid);
          if (!isUser) {
            await ctx.service.user.addWxUser(postData);
          }
          let params = {
            token,
            userId: postData.user_id,
          };
          this.Success({ params, msg: '登录成功' });
        } else {
          this.Error({ msg: '登录失败' });
        }
      }
    } catch (error) {
      this.Error({ error, msg: '获取失败' });
    }
  }
}

module.exports = UserController;
